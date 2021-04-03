import { useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import codeShift from "jscodeshift";
import Highlighter from "monaco-jsx-highlighter";
import './CodeEditor.css';
import './syntax.css';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = (props) => {
  const { initialValue, onChange } = props;

  const editorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    monacoEditor.onDidChangeModelContent(() => {
      const value = getValue();
      onChange(value);
    });

    editorRef.current = monacoEditor;
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

    const highlighter = new Highlighter(

      // @ts-ignore
      window.monaco,
      codeShift,
      monacoEditor 
    );

    highlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {}
    );
  };

  const handleFormat = () => {
    /**
     * Gets the current value from the editor (unformatted)
     */
    const unformattedValue = editorRef.current.getModel().getValue();

    /**
     * Handles formatting the value using prettier
     */
    const formattedValue = prettier
      .format(unformattedValue, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');

    /**
     * Handles setting the formatted value back in the editor
     */
    editorRef.current.setValue(formattedValue);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={handleFormat}
      >
        Format
      </button>
      <MonacoEditor
        value={initialValue}
        editorDidMount={onEditorDidMount}
        height="100%"
        theme="dark"
        language="javascript"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
