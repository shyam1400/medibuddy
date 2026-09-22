import React from 'react';
import { DrugResult } from './types';

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
  page: { padding: '20px', fontFamily: 'Courier New, monospace', maxWidth: '800px', margin: '0 auto', backgroundColor: '#fff', color: '#000' },
  btn: { padding: '8px 12px', fontSize: '14px', fontWeight: 'bold', backgroundColor: '#fff', border: '3px solid #000', cursor: 'pointer', marginBottom: '20px' },
  header: { marginBottom: '20px' },
  title: { fontSize: '28px', margin: '0 0 5px 0', textTransform: 'uppercase', letterSpacing: '-1px' },
  sub: { fontSize: '16px', margin: 0, color: '#555', fontStyle: 'italic' },
  box: { border: '3px solid #000', padding: '10px', marginBottom: '20px', backgroundColor: '#f0f0f0' },
  section: { marginBottom: '25px' },
  secTitle: { fontSize: '18px', borderBottom: '3px solid #000', paddingBottom: '3px', margin: '0 0 10px 0' },
  text: { fontSize: '14px', lineHeight: '1.4', margin: 0 }
};

export default MedicationDetails;
