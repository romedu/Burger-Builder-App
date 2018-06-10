import qwest from "qwest";
qwest.limit(1);

export const saveOrder = (data, callback, callback2, errorHandler) => {
   let token = localStorage.getItem("token");
   return qwest.post(`/api/order?token=${token}`, data)
            .then(data => {
               let {status} = data;
               if(status && status !== 200 && status !== 201) throw data;
               callback();
               callback2();
            })
            .catch(error => {
               callback();
               errorHandler("Error", error.message);
            });
};