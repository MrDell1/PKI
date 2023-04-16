import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useMemo,
} from "react";

export type AuthValue = {
  email: string;
  password: string;
};

export type RegistrationArgs = {
  date?: string;
  email: string;
  password: string;
  privacyPolicy?: boolean;
  rePassword: string;
};

export type AuthService = {
  role: string;
  signOut: () => Promise<void>;
  fetcher: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
};

export type AnonService = {
  signIn: (value: AuthValue) => Promise<void>;
  signUp: (values: RegistrationArgs) => Promise<void>;
};

export type SessionServiceValue =
  | {
      status: "loading";
    }
  | {
      status: "auth";
      value: AuthService;
    }
  | {
      status: "anon";
      value: AnonService;
    };

type SessionServiceState =
  | {
      email: string;
      status: "auth";
      authorization: string;
      role: string;
    }
  | {
      status: "anon";
    };

export const SessionService = createContext<SessionServiceValue>({
  status: "loading",
});

export const useAuthService = (): AuthService => {
  const context = useContext(SessionService);

  if (context.status !== "auth") {
    throw new Error("AuthService not defined");
  }

  return context.value;
};

export const useAnonService = (): AnonService => {
  const context = useContext(SessionService);
  if (context.status !== "anon") {
    throw new Error("AnonService not defined");
  }

  return context.value;
};

export const useSessionStatus = (): SessionServiceValue["status"] => {
  const context = useContext(SessionService);

  return context.status;
};

export const getSessionQueryKey = (): string[] => {
  return ["session"];
};

type Props = {
  children: ReactNode;
};

export const SessionServiceProvider = ({ children }: Props): ReactElement => {
  const client = useQueryClient();
  const { data } = useQuery(
    getSessionQueryKey(),
    (): Promise<SessionServiceState> => {
      const authorization = localStorage.getItem("authorization");
      return Promise.resolve(
        authorization
          ? {
              status: "auth",
              email: authorization,
              authorization: authorization,
              role: authorization,
            }
          : { status: "anon" }
      );
    },
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const value = useMemo<SessionServiceValue>(() => {
    switch (data?.status) {
      case "anon":
        return {
          status: "anon",
          value: {
            signIn: async (value) => {
              const response = await fetch(
                "http://localhost:3000/auth/signin",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(value),
                }
              );
              const result = response.headers.get("Authorization");
              if (!result) {
                return Promise.reject();
              }
              localStorage.setItem("authorization", result);
              client.setQueryData<SessionServiceState>(getSessionQueryKey(), {
                status: "auth",
                email: value.email,
                authorization: result,
                role: result,
              });
              return Promise.resolve();
            },

            signUp: async (value) => {
              const response = await fetch(
                "http://localhost:3000/auth/signup",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(value),
                }
              );
              const result = await response.json();

              if (!response.ok) {
                throw new Error(result.error);
              }

              return result;
            },
          },
        };
      case "auth":
        return {
          status: "auth",
          value: {
            signOut: () => {
              localStorage.removeItem("authorization");
              client.setQueryData<SessionServiceState>(getSessionQueryKey(), {
                status: "anon",
              });
              return Promise.resolve();
            },
            fetcher: async (input, init) => {
              const authorizationToken = data?.authorization;
              if (!authorizationToken) {
                throw new Error("No authorization token");
              }

              const response = await window.fetch(input, {
                ...init,
                headers: {
                  ...init?.headers,
                  Authorization: authorizationToken,
                },
              });

              if (response.status === 401) {
                localStorage.removeItem("authorization");
                client.setQueryData<SessionServiceState>(getSessionQueryKey(), {
                  status: "anon",
                });

                throw new Error("Token timeout");
              }

              return response;
            },
            role: data.role,
          },
        };
      default:
        return { status: "loading" };
    }
  }, [data, client]);

  return (
    <SessionService.Provider value={value}>{children}</SessionService.Provider>
  );
};
