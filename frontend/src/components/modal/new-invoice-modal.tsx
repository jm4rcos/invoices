import React, { useRef } from "react";
import { createPortal } from "react-dom";
import { useDropzone } from "react-dropzone";
import { PaperclipIcon, XIcon } from "lucide-react";

interface NewInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

export const NewInvoiceModal: React.FC<NewInvoiceModalProps> = ({
  isOpen,
  onClose,
  onUpload,
}) => {
  const dropzoneRef = useRef<HTMLDivElement>(null);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
          onUpload(acceptedFiles[0]);
        }
      },
      accept: {
        "application/pdf": [".pdf"],
      },
    });

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-accent rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute bg-transparent top-2 right-2 text-red-500 hover:text-red-500"
        >
          <XIcon className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-semibold mb-4">Upload da Fatura</h2>
        <div
          {...getRootProps()}
          ref={dropzoneRef}
          className={`border-2 border-dashed border-primary rounded-lg p-8 text-center cursor-pointer ${
            isDragActive ? "border-blue-500" : ""
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-primary">Solte o arquivo aqui...</p>
          ) : (
            <p className="text-text flex flex-col items-center">
              <span className="text-secondary text-center mb-2">
                <PaperclipIcon />
              </span>
              Arraste e solte o arquivo PDF aqui, ou clique para selecionar
            </p>
          )}
        </div>
        {acceptedFiles.length > 0 && (
          <div className="mt-4">
            <p className="text-text">Arquivo selecionado:</p>
            <p className="text-primary">{acceptedFiles[0].name}</p>
          </div>
        )}
        <button
          onClick={() => dropzoneRef.current?.click()}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Selecionar Arquivo
        </button>
        <button
          onClick={() => {
            if (acceptedFiles.length > 0) {
              onUpload(acceptedFiles[0]);
            }
          }}
          className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          Enviar Fatura
        </button>
      </div>
    </div>,
    document.body
  );
};
