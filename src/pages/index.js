import { useState, useEffect } from "react";
import axios from "axios";
import {
  generateRandHexEncodedNamespaceID,
  generateRandMessage,
} from "../lib/defaultValues";

export default function Home() {
  const [namespaceId, setNamespaceId] = useState(
    generateRandHexEncodedNamespaceID()
  );
  const [data, setData] = useState(generateRandMessage());
  const [server, setServer] = useState("");
  const [port, setPort] = useState("");
  const [responseData, setResponseData] = useState("");

  const handleGenerateNamespaceId = () => {
    setNamespaceId(generateRandHexEncodedNamespaceID());
    setData(generateRandMessage());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      namespace_id: namespaceId,
      data: data,
      server: server,
      port: +port,
    };

    try {
      const response = await axios.post(`/api/curl`, payload);
      setResponseData(JSON.stringify(response?.data?.data));
    } catch (error) {
      setResponseData(
        error?.response?.data?.message
          ? error.response?.data?.message
          : error?.message
      );
    }
  };

  console.log(responseData, "response data");

  return (
    <div className="flex items-center justify-center p-12 h-screen w-full">
      <div className="mx-auto w-full max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <div className="mb-5 flex items-center">
            <label
              htmlFor="namespaceID"
              className="mr-3 block text-base font-medium text-[#07074D]"
            >
              Namespace ID:
            </label>
            <input
              type="text"
              value={namespaceId}
              onChange={(e) => setNamespaceId(e.target.value)}
              name="namespaceID"
              id="namespaceID"
              className=" rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            <button
              type="button"
              onClick={handleGenerateNamespaceId}
              className="ml-3 hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-4 text-base font-semibold text-white outline-none"
            >
              Generate
            </button>
          </div>
          <div className="mb-5">
            <label
              htmlFor="data"
              className="mb-3 mr-3 text-base font-medium text-[#07074D]"
              style={{ marginLeft: "70px" }}
            >
              Data:
            </label>
            <input
              type="text"
              value={data}
              onChange={(e) => setData(e.target.value)}
              name="data"
              id="data"
              className=" rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              style={{ width: "65%" }}
            />
          </div>
          <div className="mb-10 flex items-center">
            <label
              htmlFor="server"
              className="mr-3 block text-base font-medium text-[#07074D]"
              style={{ marginLeft: "20px" }}
            >
              Server/Port:
            </label>
            <input
              type="text"
              value={server}
              onChange={(e) => setServer(e.target.value)}
              name="server"
              id="server"
              className="mr-3 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              style={{ width: "250px" }}
            />
            <input
              type="text"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              name="port"
              id="port"
              className=" rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              style={{ width: "100px" }}
            />
          </div>
          <div className="flex justify-center items-center w-full">
            <button
              type="submit"
              className=" hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
              style={{ width: "360px", marginLeft: "45px" }}
            >
              Run
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center">
          <label
            htmlFor="server"
            className="mr-3 text-base font-medium text-[#07074D]"
            style={{ marginLeft: "-25px" }}
          >
            Response:
          </label>
          <textarea
            value={responseData}
            className="mt-5 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            readOnly
            rows={10}
            style={{ width: "70%" }}
          />
        </div>
      </div>
    </div>
  );
}
