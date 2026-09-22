import React from 'react';
import type { DrugResult } from './types';

interface MedicationDetailsProps {
  medication: DrugResult;
  onBack: () => void;
}

const MedicationDetails: React.FC<MedicationDetailsProps> = ({ medication, onBack }) => {
  return (
    <div style={styles.page}>
      <button style={styles.btn} onClick={onBack}>
        ← GO BACK TO SEARCH
      </button>

      <div style={styles.header}>
        <h1 style={styles.title}>
          {medication.openfda.brand_name?.join(', ') || 'UNKNOWN DRUG'}
        </h1>
        <p style={styles.sub}>
          Generic: {medication.openfda.generic_name?.join(', ') || 'N/A'}
        </p>
      </div>

      <div style={styles.box}>
        <p><strong>Route:</strong> {medication.openfda.route?.join(', ') || 'N/A'}</p>
        <p><strong>Type:</strong> {medication.openfda.product_type?.join(', ') || 'N/A'}</p>
      </div>

      {medication.indications_and_usage && (
        <div style={styles.section}>
          <h2 style={styles.secTitle}>INDICATIONS & USAGE</h2>
          <p style={styles.text}>{medication.indications_and_usage.join(' ')}</p>
        </div>
      )}

      {medication.dosage_and_administration && (
        <div style={styles.section}>
          <h2 style={styles.secTitle}>DOSAGE & ADMINISTRATION</h2>
          <p style={styles.text}>{medication.dosage_and_administration.join(' ')}</p>
        </div>
      )}

      {medication.warnings && (
        <div style={styles.section}>
          <h2 style={{ ...styles.secTitle, color: 'red', borderBottomColor: 'red' }}>⚠️ WARNINGS & PRECAUTIONS</h2>
          <p style={styles.text}>{medication.warnings.join(' ')}</p>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
   container: { maxWidth: '600px', margin: '20px auto', padding: '0 15px', fontFamily: 'sans-serif', color: 'black', lineHeight: '1.4' },
  btn: { padding: '6px 12px', cursor: 'pointer', background: 'white', border: '1px solid black', borderRadius: '4px', color: 'blue' },
  title: { fontSize: '24px', margin: '15px 0 5px 0', color: 'blue' },
  subtitle: { color: 'black', margin: '0 0 15px 0', fontStyle: 'italic' },
  meta: { padding: '10px', background: 'white', border: '1px solid black', borderRadius: '4px', marginBottom: '20px' },
  section: { marginBottom: '20px' },
  heading: { fontSize: '18px', borderBottom: '1px solid black', paddingBottom: '4px', margin: '0 0 8px 0', color: 'blue' }
};

export default MedicationDetails;
