import { useSelector } from "react-redux";
import LeftUpShadow from "../src/components/Gradients/LeftUpShadow";
import RightUpShadow from "../src/components/Gradients/RightUpShadow";
import DownShadow from "../src/components/Gradients/DownShadow";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "../src/components/Auth/LoginForm/LoginForm";
import { MoviesFilterProvider } from "../src/components/Filter/MoviesFilterContext";
import { WatchedFilterProvider } from "../src/components/Filter/WatchedFilterContext";
import { ModalProvider } from "../src/components/Modal/ModalContext";
import Header from "../src/components/Header/Header";
import Modal from "../src/components/Modal/Modal";
import MoviesSection from "../src/components/MovieSection/MoviesSection";
import WatchedSection from "../src/components/WatchedSection/WathcedSection";

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
                        />
                      }
                    />
                    <Route
                      path="/series"
                      element={
                        <MoviesSection
                          movies={props.series}
                          addMovie={props.addMovieOrSeries}
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
    
const useRoutes = (props) => {
    const isAuth = useSelector((state) => state.auth.isAuth)

    return  isAuth ? UserAuthRouter(props) : UserNotAuthRouter()
};

export default useRoutes;