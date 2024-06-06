import { AxiosResponse } from "axios";
import { useRef, useState } from "react";

interface DownloadFileProps {
  readonly apiDefinition: () => Promise<AxiosResponse<Blob>>;
  readonly preDownloading: () => void;
  readonly postDownloading: () => void;
  readonly onError: () => void;
  readonly getFileName: () => string;
}

interface DownloadedFileInfo {
  readonly download: () => Promise<void>;
  readonly ref: React.MutableRefObject<HTMLAnchorElement | null>;
  readonly name: string | undefined;
  readonly url: string | undefined;
}

export const useDownloadFile = ({
  apiDefinition,
  preDownloading,
  postDownloading,
  onError,
  getFileName,
}: DownloadFileProps): DownloadedFileInfo => {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [url, setFileUrl] = useState<string>();
  const [name, setFileName] = useState<string>();

  const download = async () => {
    try {
        console.log('start download....');
        console.log('start preDownloading....');
      preDownloading();
      console.log('start apiDefinition....');
      const { data } = await apiDefinition();

      const url = URL.createObjectURL(new Blob([data]));
      setFileUrl(url);
      setFileName(getFileName());

      ref.current?.click();

      console.log('start postDownloading....');
      postDownloading();
      URL.revokeObjectURL(url);
    } catch (error) {
        //console.error(error);
      onError();
    }
  };

  return { download, ref, url, name };
};