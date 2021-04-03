import { useRef, useEffect } from "react";
import "./CodePreview.css";

interface CodePreviewProps {
  code: string;
  error: string;
}

const html = `
<html>
<head>
  <style>
     html { background-color: #fff; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script>

  const handleError = (err) => {
    const root = document.querySelector('#root');
    root.innerHTML = '<div style="color: red;"> <h4> Runtime Error </h4>' + err + '</div>';
    console.error(err);
  }

  window.addEventListener('error', (event) => {
     event.preventDefault();
     handleError(event.error)
  });

  window.addEventListener('message', (event) => {
    try {
      eval(event.data)
    } catch (err) {
       handleError(err);
    }
 }, false );


  </script>
</body>
</html>`;

const CodePreview: React.FC<CodePreviewProps> = (props) => {
  const { code, error } = props;

  const iframeRef = useRef<any>();

  useEffect(() => {
    iframeRef.current.srcdoc = html;
  }, [code]);

  const handleLoad = () => {
    iframeRef.current.contentWindow.postMessage(code, "*");
  };

  return (
    <div className="preview-wrapper">
      <iframe
        title="Code Preview"
        ref={iframeRef}
        sandbox="allow-scripts"
        srcDoc={html}
        onLoad={handleLoad}
      />
      {error && <div className="preview-error"> {error} </div>}
    </div>
  );
};

export default CodePreview;
