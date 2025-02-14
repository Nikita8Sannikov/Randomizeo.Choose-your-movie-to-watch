import { useSelector } from "react-redux";
import LeftUpShadow from "../Gradients/LeftUpShadow";
import RightUpShadow from "../Gradients/RightUpShadow";
import DownShadow from "../Gradients/DownShadow";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "../Auth/LoginForm/LoginForm";
import { MoviesFilterProvider } from "../Filter/MoviesFilterContext";
import { WatchedFilterProvider } from "../Filter/WatchedFilterContext";
import { ModalProvider } from "../Modal/ModalContext";
import Header from "../Header/Header";
import Modal from "../Modal/Modal";
import MoviesSection from "../MovieSection/MoviesSection";
import WatchedSection from "../WatchedSection/WathcedSection";

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
              <LeftUpShadow />
              <RightUpShadow />
              <DownShadow />
              <main>
                <Header />
                <Modal />
                <div className="content">
                  
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
                      element={<WatchedSection movies={props.watchedMovies} />}
                    />
                    <Route
                      path="/watched/series"
                      element={<WatchedSection movies={props.watchedSeries} />}
                    />
                    <Route
                      path="*"
                      element={
                        <Navigate to="/"/>
                      }
                    />
                  </Routes>
                </div>
              </main>
            </ModalProvider>
          </WatchedFilterProvider>
        </MoviesFilterProvider>
    )
    
const AppRoutes = (props) => {
    const isAuth = useSelector((state) => state.auth.isAuth)

    return  isAuth ? <UserAuthRouter{...props}/> : <UserNotAuthRouter/>
};

export default AppRoutes;