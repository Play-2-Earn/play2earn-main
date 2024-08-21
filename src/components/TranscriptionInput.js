import React from 'react';

const TranscriptionInput = ({ value, onChange }) => (
  <div>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows="4"
      cols="50"
      placeholder="Type your transcription here..."
    />
  </div>
);

export default TranscriptionInput;

  