import { paths } from "@utils/paths";
import { lazy, ReactElement, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Google } from "./Oauth/Google/Google";
import { Resource } from "./Resource/Resource";

const ContentWrapper = lazy(() => import("./ContentWrapper/ContentWrapper"));
const SignInPage = lazy(() => import("./SignInPage/SignInPage"));
const SignUpPage = lazy(() => import("./SignUpPage/SignUpPage"));
const LandingPage = lazy(() => import("./LandingPage/LandingPage"));
const Public = lazy(() => import("./Public/Public"));
const Protected = lazy(() => import("./Protected/Protected"));

export const Router = (): ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Suspense fallback={null}>
              <LandingPage />
            </Suspense>
          }
          path={paths.root}
        />
        <Route
          element={
            <Suspense fallback={null}>
              <SignInPage />
            </Suspense>
          }
          path={paths.signIn}
        />
        <Route
          element={
            <Suspense fallback={null}>
              <SignUpPage />
            </Suspense>
          }
          path={paths.signUp}
        />
        <Route
          element={
            <Suspense fallback={null}>
              <Public />
            </Suspense>
          }
          path={paths.public}
        />
        <Route element={<Google />} path={paths.googleAuth} />

        <Route
          element={
            <Suspense fallback={null}>
              <Protected />
            </Suspense>
          }
          path={paths.root}
        >
          <Route element={<ContentWrapper />}>
            <Route element={<Resource />} path={paths.resources} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
