'use client';

import React, { useState } from 'react';
import FormatSelectorForm from './FormatSelectorForm';
import TranscriptViewer from './TranscriptViewer';
import TestsViewer from './TestsViewer';
import HighTestsViewer from './HighTestsViewer';

interface FormatSelectorState {
  format: string;
  registerNumber: string;
}

export default function FormatSelector() {
  const [state, setState] = useState<FormatSelectorState | null>(null);

  const handleFormatSelect = (format: string, registerNumber: string) => {
    setState({ format, registerNumber });
  };

  const renderSelectedComponent = () => {
    if (!state) return null;

    switch (state.format) {
      case 'transcript':
        return <TranscriptViewer registerNumber={state.registerNumber} />;
      case 'tests':
        return <TestsViewer registerNumber={state.registerNumber} />;
      case 'high-tests':
        return <HighTestsViewer registerNumber={state.registerNumber} />;
      default:
        return null;
    }
  };

  return (
    <>
      <FormatSelectorForm onFormatSelect={handleFormatSelect} />
      {renderSelectedComponent()}
    </>
  );
}
