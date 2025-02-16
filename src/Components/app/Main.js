import Router from "../router/Router"
import Header from "../app/Header"
import WidgetLeft from "./Widget-left";
import WidgetRight from "./Widget-right";

function Main() {
	return (
		<div className="main grid">
            <WidgetLeft />
            <div className="square container">
                <div className="header">
                    <Header />
                </div>
                <div className="body">
                <Router></Router>
                </div>
            </div>
            <WidgetRight />
        </div>
	);
}

export default Main;