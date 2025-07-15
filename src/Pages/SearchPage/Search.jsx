import React, { useEffect, useRef, useState } from "react";
import useAxiosSecure from "../../utils/useAxiosSecure";
import toast from "react-hot-toast";
import Loading from "../../Shared/Loading/Loading";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Search = () => {
  const axiosSecure = useAxiosSecure();

  const [bloodGroup, setBloodGroup] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [upazilaName, setUpazilaName] = useState("");
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    axiosSecure.get("/geocode/districts").then((res) => setDistricts(res.data));
    axiosSecure.get("/geocode/upazilas").then((res) => setUpazilas(res.data));
  }, [axiosSecure]);

  useEffect(() => {
    if (districtId) {
      const filtered = upazilas.filter((u) => u.district_id === districtId);
      setFilteredUpazilas(filtered);
      setUpazilaName(""); // reset upazila on district change
    }
  }, [districtId, upazilas]);

  const handleSearch = async () => {
    if (!bloodGroup || !districtId || !upazilaName) {
      return toast.error("Please select all fields");
    }

    try {
      setLoading(true);
      setHasSearched(true);
      setDonors([]);

      const { data } = await axiosSecure.get("/users");
      const selectedDistrict = districts.find((d) => d.id === districtId);
      const filtered = data.filter(
        (user) =>
          user.role === "donor" &&
          user.status === "active" &&
          user.bloodGroup === bloodGroup &&
          user.district === selectedDistrict.name &&
          user.upazila === upazilaName
      );
      setDonors(filtered);
    } catch (err) {
      toast.error("Search failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const pdfRef = useRef();



const downloadPDF = () => {
  if (donors.length === 0) {
    toast.error("No donors to download");
    return;
  }

  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Blood Donor Search Results", 14, 20);

  // Table Headers
  const head = [["Name", "Email", "Blood Group", "District", "Upazila"]];

  // Table Rows
  const rows = donors.map((donor) => [
    donor.name,
    donor.email,
    donor.bloodGroup,
    donor.district,
    donor.upazila,
  ]);

  autoTable(doc, {
    startY: 30,
    head,
    body: rows,
    styles: {
      halign: "left",
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [215, 38, 61], // Bloodline Red
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
  });

  doc.save("donor-search-results.pdf");
};



  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-[#D7263D] mb-6">
        Search for Blood Donors 🩸
      </h2>

      {/* Search Form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <select
          className="select select-bordered"
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
        >
          <option value="">Select Blood Group</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        <select
          className="select select-bordered"
          value={districtId}
          onChange={(e) => setDistrictId(e.target.value)}
        >
          <option value="">Select District</option>
          {districts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <select
          className="select select-bordered"
          value={upazilaName}
          onChange={(e) => setUpazilaName(e.target.value)}
        >
          <option value="">Select Upazila</option>
          {filteredUpazilas.map((u) => (
            <option key={u.id} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleSearch}
          className="btn btn-primary gradient-red w-full"
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Search"
          )}
        </button>
      </div>

      {/* Donor Results */}
      <div className="mt-6">
        {loading && <Loading />}

        {!loading && hasSearched && donors.length === 0 && (
          <div className="text-center text-red-500 font-semibold">
            No donor found for your selected area and blood group.
          </div>
        )}
        {donors.length > 0 && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Found {donors.length} donor{donors.length > 1 ? "s" : ""}
              </h3>
              <button
                className="btn btn-outline btn-sm text-red-600 border-red-400"
                onClick={downloadPDF}
              >
                Download PDF
              </button>
            </div>

            <div ref={pdfRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {donors.map((donor) => (
                <div
                  key={donor._id}
                  className="p-5 bg-white rounded-lg shadow border border-gray-100 flex gap-4 items-center"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#D7263D] text-white flex items-center justify-center font-bold text-lg">
                      {donor.bloodGroup}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {donor.name}
                    </h4>
                    <p className="text-sm text-gray-500">{donor.email}</p>
                    <div className="text-sm text-gray-600 mt-1 flex flex-col sm:flex-row sm:gap-4">
                      <span>
                        <span className="font-medium">District:</span>{" "}
                        {donor.district}
                      </span>
                      <span>
                        <span className="font-medium">Upazila:</span>{" "}
                        {donor.upazila}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
