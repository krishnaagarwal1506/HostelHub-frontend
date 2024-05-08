import {
  fetchApplicationListData,
  fetchComplaintListData,
  FetchgraphData,
  fetchGymListData,
  fetchNoticeData,
  fetchStudentListData,
} from "@src/ts/types";
import { deleteData, fetchData, sendData } from "@src/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type AxiosError } from "axios";

export interface ErrorResponse {
  statusCode: number;
  message: string;
  errorField: string | null | undefined;
  messages: string[];
  timestamp: string;
}

export interface SendDataParams {
  url: string;
  method: "POST" | "PUT";
  //eslint-disable-next-line
  content: any;
  wrapper?: boolean;
}

export const useFetchRoomStatusGraphChart = (url: string) => {
  return useQuery<FetchgraphData | null, AxiosError<ErrorResponse>>({
    queryKey: ["fetchRoomStatusgraphData", url],
    queryFn: async () => await fetchData(url),
  });
};

export const useFetchComplaintStatusGraphChart = (url: string) => {
  return useQuery<FetchgraphData | null, AxiosError<ErrorResponse>>({
    queryKey: ["fetchComplaintStatusGraphChart", url],
    queryFn: async () => await fetchData(url),
  });
};

export const useFetchNoticeData = (url: string) => {
  return useQuery<fetchNoticeData | null, AxiosError<ErrorResponse>>({
    queryKey: ["FetchNoticeData", url],
    queryFn: async () => await fetchData(url),
  });
};

export const useFetchGymListData = (url: string) => {
  return useQuery<fetchGymListData | null, AxiosError<ErrorResponse>>({
    queryKey: ["FetchGymListData", url],
    queryFn: async () => await fetchData(url),
  });
};

export const useSaveGymMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetchGymfListData"],
      });
    },
  });
};

export const useFetchStudentListData = (url: string) => {
  return useQuery<fetchStudentListData | null, AxiosError<ErrorResponse>>({
    queryKey: ["FetchStudentListData", url],
    queryFn: async () => await fetchData(url),
  });
};

export const useFetchComplaintListData = (url: string) => {
  return useQuery<fetchComplaintListData | null, AxiosError<ErrorResponse>>({
    queryKey: ["FetchComplaintListData", url],
    queryFn: async () => await fetchData(url),
  });
};

export const useFetchApplicationListData = (url: string) => {
  return useQuery<fetchApplicationListData | null, AxiosError<ErrorResponse>>({
    queryKey: ["FetchApplicationData", url],
    queryFn: async () => await fetchData(url),
  });
};

export const useSaveNotice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["FetchNoticeData"],
      });
    },
  });
};

export const useDeleteNotice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["FetchNoticeData"],
      });
    },
  });
};

export const useSaveUser = () => {
  return useMutation({
    mutationFn: sendData,
  });
};

export const useSaveStudentData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["FetchStudentListData"],
      });
    },
  });
};

export const useDeleteStudentData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["FetchStudentListData"],
      });
    },
  });
};

export const useDeleteUserData = () => {
  return useMutation({
    mutationFn: deleteData,
  });
};

export const useSaveComplaintData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["FetchComplaintListData"],
      });
    },
  });
};

export const useDeleteComplaintData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["FetchComplaintListData"],
      });
    },
  });
};

export const useSaveApplicationData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["FetchApplicationData"],
      });
    },
  });
};

export const useDeleteApplicationData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["FetchApplicationData"],
      });
    },
  });
};
