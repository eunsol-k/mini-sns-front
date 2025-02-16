import { BrowserRouter } from "react-router-dom";

import AuthProvider from "./Components/context/AuthProvider"
import HttpHeadersProvider from "./Components/context/HttpHeadersProvider";
import CardProvider from "./Components/context/CardProvider"
import Main from './Components/app/Main'

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <HttpHeadersProvider>
            <CardProvider>
              <Main />
            </CardProvider>
          </HttpHeadersProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
