import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  // CommonJS configuration
  {
    target: "web",
    entry: "./src/index.ts",
    output: {
      globalObject: "globalThis",
      path: path.resolve(__dirname, "dist"),
      filename: "index.js",
      library: {
        name: "reactjs-notify-toast",
        type: "umd",
      },
      clean: true,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    externals: {
      react: "react",
      "react-dom": "react-dom",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/preset-react"],
                retainLines: true, // Ensure directives like "use client" are preserved
              },
            },
            {
              loader: "ts-loader",
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [tailwindcss, autoprefixer],
                },
              },
            },
          ],
        },
      ],
    },
  },
  // ES Module configuration
  {
    entry: "./src/index.ts",
    output: {
      globalObject: "globalThis",
      path: path.resolve(__dirname, "dist"),
      filename: "index.esm.js",
      library: {
        type: "module",
      },
      module: true, // Enable the output as an ES module
      clean: false,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    externals: {
      react: "react",
      "react-dom": "react-dom",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/preset-react"],
                retainLines: true, // Ensure directives like "use client" are preserved
              },
            },
            {
              loader: "ts-loader",
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [tailwindcss, autoprefixer],
                },
              },
            },
          ],
        },
      ],
    },
    experiments: {
      outputModule: true,
    },
  },
];
