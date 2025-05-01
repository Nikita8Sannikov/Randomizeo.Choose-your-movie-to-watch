import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
// import { lazy, Suspense } from "react";

import { MoviesFilterProvider } from "../Filter/MoviesFilterContext";
import { WatchedFilterProvider } from "../Filter/WatchedFilterContext";
import { ModalProvider } from "../Modal/ModalContext";

import LeftUpShadow from "../Gradients/LeftUpShadow";
import RightUpShadow from "../Gradients/RightUpShadow";
import DownShadow from "../Gradients/DownShadow";
import LoginForm from "../Auth/LoginForm/LoginForm";
import Header from "../Header/Header";
import Modal from "../Modal/Modal";
import Spinner from "../Spinner/Spinner";
import MoviesSection from "../MovieSection/MoviesSection";
import WatchedSection from "../WatchedSection/WathcedSection";

import styles from "./AppRoutes.module.css";

// const MoviesSection = lazy(() => import("../MovieSection/MoviesSection"));
// const WatchedSection = lazy(() => import("../WatchedSection/WathcedSection"));

const UserNotAuthRouter = () => (
      <>
        <LeftUpShadow />
        <RightUpShadow />
        <DownShadow />
          <Routes>
            <Route
              path="/auth"
              element={
                <div className="appContainer">
                  <LoginForm/>
                </div>
              }
            />
          
            <Route
              path="*"
              element={
               <Navigate to="/auth"/>
              }
            />
          </Routes>
      </>
    )

  const UserAuthRouter = (props) =>(
        <MoviesFilterProvider>
          <WatchedFilterProvider>
            <ModalProvider
              {...props}
            >
              {/* <LeftUpShadow />
              <RightUpShadow />
              <DownShadow /> */}
              <main>
                <Header />
                <Modal />
                <div className="content">
                {/* <Suspense fallback={<div>Загрузка...</div>}> */}
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <MoviesSection
                          movies={props.movies}
                          addMovie={props.addMovieOrSeries}
                          setMoviesForAdd={props.setMovies}
                          setSeriesForAdd={props.setSeries}
                        />
                      }
                    />
                    <Route
                      path="/series"
                      element={
                        <MoviesSection
                          movies={props.series}
                          addMovie={props.addMovieOrSeries}
                          setMoviesForAdd={props.setMovies}
                          setSeriesForAdd={props.setSeries}
                        />
                      }
                    />
                    <Route
                      path="/watched"
                      element={<WatchedSection
                         movies={props.watchedMovies}
                         setMovies={props.setWatchedMovies}
                         />}
                    />
                    <Route
                      path="/watched/series"
                      element={<WatchedSection
                         movies={props.watchedSeries}
                         setSeries={props.setWatchedSeries}
                         />}
                    />
                    <Route
                      path="*"
                      element={
                        <Navigate to="/"/>
                      }
                    />
                  </Routes>
                {/* </Suspense> */}
                </div>
              </main>
            </ModalProvider>
          </WatchedFilterProvider>
        </MoviesFilterProvider>
    )
    
const AppRoutes = (props) => {
    const status = useSelector((state) => state.auth.status);
    const isAuth = useSelector((state) => state.auth.isAuth)

    return (
      <div className={styles.appWrapper}>
        <LeftUpShadow />
        <RightUpShadow />
        <DownShadow />

        { status === 'loading'
          ? <Spinner/> 
          :
          isAuth 
          ? <UserAuthRouter{...props}/> 
          : <UserNotAuthRouter/> }
      </div>
    ) 
};
export default AppRoutes;