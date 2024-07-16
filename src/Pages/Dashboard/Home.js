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
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [list_, setList_] = useState([]);
  const [sellerList, setSellerList] = useState([]);
  useEffect(() => {
    window.onpopstate = function (event) {
      // Redirect the user to a specific location
      navigate("/home");
    };
    const q = query(
      collection(FIRESTORE_DB, "products"),
      where("status", "==", "active")
    );
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        //resolve(querySnapshot)
        let list = querySnapshot.docs.map((res) => {
          return {
            productID: res.id,
            productName: res.data().name,
            sellerID: res.data().userId,
            productDescription: res.data().desc,
            productImage: res.data().pic,
          };
        });
        setList(list);
        setList_(list);
        // console.log(list)
      },
      () => {
        return unsubscribe();
      },
      (err) => {
        console.log(err);
      }
    );
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
        //console.log(list);
        setSellerList(list);
      },
      () => {
        return unsubscribe1();
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  const getUserData = (list, id) => {
    var data = {};
    list.forEach((element) => {
      if (element.id == id) {
        data = element;
      }
    });
    return data.data();
  };
  const removeHandler = async (id, remarks_removed) => {
    const ref = doc(FIRESTORE_DB, "products", id);
    await updateDoc(ref, {
      status: "archived",
      remarks_removed,
    });
  };
  const filterHandler = (text) => {
    console.log(text);
    try {
      if (text !== "") {
        let temp = list.filter((res) => {
          console.log(res.sellerID === text);
          if (res.sellerID === text) {
            return res;
          }
        });
        if (temp.length <= 0) {
          alert("No products displayed by this store.");
          temp = list_;
        }
        setList(temp);
      } else {
        setList(list_);
      }
    } catch (err) {
      alert(err);
    }
  };
  const searchHandler = (text) => {
    try {
      if (text !== "") {
        setList(
          list.filter((res) => {
            if (
              res.productName.toUpperCase().match(text.toUpperCase()) ||
              res.productDescription.toUpperCase().match(text.toUpperCase())
            ) {
              return res;
            }
          })
        );
      } else {
        setList(list_);
      }
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div>
      <div className="row mt-1">
        <div className="col-sm-12 col-md-10 col-lg-10">
          <div className="d-flex my-2 my-lg-0">
            <input
              onChange={(evt) => {
                searchHandler(evt.target.value);
              }}
              className="form-control me-sm-2"
              type="text"
              placeholder="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="button"
            >
              Search
            </button>
          </div>
        </div>
        <div className="col-sm-12 col-md-2 col-lg-2">
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
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Seller</th>
              <th>Product name</th>
              <th>Product Description</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((res, index) => (
              <tr key={index}>
                <td>{res.productID}</td>
                <td>{getUserData(sellerList, res.sellerID).storename}</td>
                <td>{res.productName}</td>
                <td>{res.productDescription}</td>
                <td>
                  {res.productImage.map((url) => (
                    <img src={url} style={{ width: 100 }} />
                  ))}
                </td>
                <td
                  className="text-danger pointer"
                  onClick={() => {
                    const result = window.prompt(
                      "Please remarks before product removal."
                    );

                    if (result) {
                      removeHandler(res.productID, result);
                      alert("Removed Item Successfully! ");
                    } else {
                      // User clicked Cancel or closed the prompt
                      console.log("User canceled the prompt");
                    }
                  }}
                >
                  Remove
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
