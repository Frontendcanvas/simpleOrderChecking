// function checkCakeStatus(orderId) {
//   console.log("orderId:", orderId);

//   return fetch("./order.json")
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Could not fetch the orders database file.");
//       }

//       return response.json();
//     })
//     .then((ordersList) => {

//       // find() returns the order object or undefined
//       console.log("ordersList",ordersList);
//       console.log("user orderId",orderId);
//       const singleOrder = ordersList.find(
//         (order) => order.orderId === orderId
//       );
//       console.log("singleOrder",singleOrder)
//       if (singleOrder) {
//         if(singleOrder.status == done ){
//             resolve(singleOrder.orderId +'order is ready to deliver')
//         }else{
//             reject(singleOrder.orderId +'sorry we failed to deliver the order.')
//         }
//         return singleOrder;
//       }

//       throw new Error("😢 Sorry, we haven't received the order yet.");
//     });
// }
function checkCakeStatus(orderId) {

  return fetch("./order.json")
    .then((response) => {

      if (!response.ok) {
        throw new Error("Could not fetch the orders database file.");
      }

      return response.json();
    })
    .then((ordersList) => {

      const singleOrder = ordersList.find(
    (order) =>
      String(order.orderId).toLowerCase().trim() ===
      String(orderId).toLowerCase().trim()
  );

      console.log("singleOrder:", singleOrder);

      // Order ID doesn't exist
      if (!singleOrder) {
        throw new Error(
          "😢 Sorry, we haven't received the order yet."
        );
      }

      // Order exists and is done
      if (singleOrder.status.toLowerCase() === "done") {

        return `${singleOrder.orderId} order is ready to deliver`;

      }

      // Order exists but isn't done
      throw new Error(
        `${singleOrder.orderId} sorry, we failed to deliver the order.`
      );
    });
}

const orderBtn = document.getElementById("orderBtn");
const statusInput = document.getElementById("statusInput");

orderBtn.addEventListener("click", () => {

  const currentInput = statusInput.value.toLowerCase().trim();

  statusInput.value = "";

  checkCakeStatus(currentInput)
    .then((message) => {

      Swal.fire({
        title:"Order Status!",
        text: message,
        icon: "success",
        confirmButtonText: "Yum!",
      });

    })
    .catch((error) => {

      Swal.fire({
        title: "Order Status!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Oh no!",
      });

    });

});