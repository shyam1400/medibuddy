import React, { useState, useEffect, ChangeEvent } from 'react';
import MedicationDetails from '/Users/shyam/Desktop/medibuddy/src/MedicationDetails.tsx';
import { DrugResult } from '/Users/shyam/Desktop/medibuddy/src/types.ts';

interface FdaApiResponse {
  results?: DrugResult[];
}

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<DrugResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMed, setSelectedMed] = useState<DrugResult | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const delayDebounceTimer = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${encodeURIComponent(query)}&limit=20`
        );
        
        if (!response.ok) {
          throw new Error('NO MEDS FOUND.');
        }
        
        const data: FdaApiResponse = await response.json();
        const validResults = (data.results || []).filter(
          (item) => item.openfda && item.openfda.brand_name && item.openfda.brand_name.length > 0
        );
        
        setResults(validResults);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'ERROR OCCURRED');
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceTimer);
  }, [query]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  if (selectedMed) {
    return <MedicationDetails medication={selectedMed} onBack={() => setSelectedMed(null)} />;
  }

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.mainTitle}>DRUG LOOKUP v1.0</h1>
      
      <input
        type="text"
        placeholder="Type drug name here..."
        value={query}
        onChange={handleInputChange}
        style={styles.searchBox}
      />

      {loading && <div style={styles.loader}>[ FETCHING DATA FROM FDA... ]</div>}
      {error && <div style={styles.errTxt}>!! {error} !!</div>}

      {results.length > 0 && (
        <ul style={styles.list}>
          {results.map((item, index) => {
            const displayBrand = (item.openfda?.brand_name && item.openfda.brand_name[0]) || 'UNKNOWN';
            const displayGeneric = (item.openfda?.generic_name && item.openfda.generic_name[0]) || '';

            return (
              <li 
                key={`${item.setid || index}-${index}`} 
                style={styles.item}
                onClick={() => setSelectedMed(item)}
              >
                <strong>{displayBrand}</strong> 
                {displayGeneric && <span> ({displayGeneric})</span>}
                <span style={styles.arrow}> [CLICK TO OPEN] →</span>
              </li>
            );
          })}
        </ul>
      )}

      {!loading && query && results.length === 0 && !error && (
        <div style={styles.noData}>0 RESULTS FOUND.</div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  wrapper: { width: '100%', maxWidth: '500px', margin: '40px auto', padding: '15px', fontFamily: 'Courier New, monospace', boxSizing: 'border-box', backgroundColor: '#fff', color: '#000' },
  mainTitle: { fontSize: '24px', fontWeight: 'bold', margin: '0 0 15px 0', borderBottom: '3px double #000', paddingBottom: '5px' },
  searchBox: { width: '100%', padding: '10px', fontSize: '16px', fontFamily: 'Courier New, monospace', border: '3px solid #000', outline: 'none', boxSizing: 'border-box' },
  loader: { color: 'blue', marginTop: '10px', fontSize: '14px', fontWeight: 'bold' },
  errTxt: { color: 'red', marginTop: '10px', fontSize: '14px', fontWeight: 'bold' },
  list: { listStyleType: 'none', padding: 0, marginTop: '15px', border: '3px solid #000', backgroundColor: '#fff' },
  item: { padding: '10px', borderBottom: '1px solid #000', cursor: 'pointer', fontSize: '14px', position: 'relative' },
  arrow: { float: 'right', color: '#666', fontSize: '12px' },
  noData: { marginTop: '15px', border: '3px dashed #000', padding: '10px', textAlign: 'center', fontSize: '14px' }
};

export default SearchBar;
