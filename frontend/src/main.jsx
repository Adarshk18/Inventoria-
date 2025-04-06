import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

// Define a theme (optional)
const theme = extendTheme({
	styles: {
	  global: {
		"html, body": {
		  transition: "background 0.2s ease, color 0.2s ease",
		},
	  },
	},
  });

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<ChakraProvider theme={theme}>  
				<App />
			</ChakraProvider>
		</BrowserRouter>
	</React.StrictMode>
);
