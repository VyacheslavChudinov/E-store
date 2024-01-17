import { UploadFile } from "@mui/icons-material";
import { FormControl, FormHelperText, Typography } from "@mui/material";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UseControllerProps, useController } from "react-hook-form";

interface StoreFileDropzoneProps extends UseControllerProps {}

export default function StoreFileDropzone(props: StoreFileDropzoneProps) {
  const { field, fieldState } = useController({ ...props, defaultValue: null });

  const onDrop = useCallback(
    (acceptedFiles: object[]) => {
      acceptedFiles[0] = Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0] as Blob),
      });

      field.onChange(acceptedFiles[0]);
    },
    [field]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const dropZoneStyles = {
    display: "flex",
    border: "dashed 3px #eee",
    borderColor: "#eee",
    borderRadius: "4px",
    paddingTop: "30px",
    alignItems: "center",
    height: 200,
    width: 500,
  };

  const dropZoneActiveStyles = {
    borderColor: "green",
  };

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <FormControl
        style={
          isDragActive
            ? { ...dropZoneStyles, ...dropZoneActiveStyles }
            : dropZoneStyles
        }
        error={!!fieldState.error}
      >
        <input {...getInputProps()}></input>
        <UploadFile sx={{ fontSize: "100px" }} />
        <Typography variant="h4">Drop image here</Typography>
        <FormHelperText>{fieldState.error?.message}</FormHelperText>
      </FormControl>
    </div>
  );
}
