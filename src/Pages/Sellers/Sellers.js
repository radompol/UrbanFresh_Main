import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { FIRESTORE_DB } from "../../Utils/Firebase_config";
import Userlist from "../Users/Userlist";
import { useNavigate } from "react-router-dom";

function Sellers() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [sellerList, setSellerList] = useState([]);
  const [sellerList_, setSellerList_] = useState([]);
  useEffect(() => {
    window.onpopstate = function (event) {
      // Redirect the user to a specific location
      navigate("/home");
    };

    const q1 = query(
      collection(FIRESTORE_DB, "users"),
      where("userType", "!=", 1)
    );
    const unsubscribe1 = onSnapshot(
      q1,
      (querySnapshot) => {
        //resolve(querySnapshot)
        let list = querySnapshot.docs.map((res) => {
          return res;
        });
        // console.log(list);
        setSellerList(list);
        setSellerList_(list);
      },
      () => {
        return unsubscribe1();
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  const searchHandler = (text) => {
    try {
      if (text !== "") {
        let temp = sellerList.filter((res) => {
          if (
            res.data().storename.toUpperCase().match(text.toUpperCase()) ||
            res.data().email.toUpperCase().match(text.toUpperCase())
          ) {
            return res;
          }
        });
        if (temp <= 0) {
          temp = sellerList_;
        }
        setSellerList(temp);
      } else {
        setSellerList(sellerList_);
      }
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className="mx-2">
      <div className="row mt-1">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <div className="d-flex my-2 my-lg-0">
            <input
              onChange={(evt) => {
                searchHandler(evt.target.value);
              }}
              className="form-control me-sm-2"
              type="text"
              placeholder="Search Name/Email"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="button"
            >
              Search
            </button>
          </div>
        </div>
        {/* <div className="col-sm-12 col-md-2 col-lg-2">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-3">
              <p className="mt-1 mb-0">FILTER</p>
            </div>

            <div className="col-sm-12 col-md-12 col-lg-9">
              <select
                onChange={(evt) => {
                  filterHandler(evt.target.value);
                }}
                className="form-control me-sm-2 border"
              >
                <option value="">Select Store</option>
                {sellerList.map((res) => (
                  <option value={res.id}>{res.data().storename}</option>
                ))}
              </select>
            </div>
          </div>
        </div> */}
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Seller ID</th>
              <th>Store Name</th>
              <th>Business Contact No.</th>
              <th>Email</th>
              <th>Password</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {sellerList.map((res, index) => (
              <tr key={index}>
                <td>{res.id}</td>
                <td>{res.data().storename}</td>
                <td>{res.data().mobile}</td>
                <td>{res.data().email}</td>
                <td>{res.data().cpass}</td>
                <td>{res.data().productName}</td>
                <td>
                  <img src={res.data().pic} style={{ width: 100 }} />{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Sellers;
