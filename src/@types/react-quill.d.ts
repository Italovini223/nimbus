declare module "react-quill" {
    import React from "react";
  
    export interface QuillOptions {
      theme?: string;
      modules?: any;
      formats?: string[];
      placeholder?: string;
      readOnly?: boolean;
    }
  
    export interface ReactQuillProps {
      value?: string;
      defaultValue?: string;
      onChange?: (content: string, delta?: any, source?: string, editor?: any) => void;
      onFocus?: () => void;
      onBlur?: () => void;
      modules?: QuillOptions["modules"];
      formats?: QuillOptions["formats"];
      placeholder?: string;
      readOnly?: boolean;
      ref?: React.Ref<any>;
    }
  
    export default class ReactQuill extends React.Component<ReactQuillProps> {
      getEditor: () => any;
    }
  }
  