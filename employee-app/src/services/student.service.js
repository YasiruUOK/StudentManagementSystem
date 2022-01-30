import http from "../http-common";

class StudentDataService {
  getAll() {
    return http.get("/Student");
  }

  get(id) {
    return http.get("/Student/"+id);
  }

  create(data) {
    return http.post("/Student", data, {
      headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    });
  }

  update(data) {
    //return http.put(`/Student/${id}`, data);
    return http.put("/Student", data, {
      headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    });
  }

  delete(studentID) {
    //console.log(studentID);
    return http.delete("/Student/"+studentID);
  }

  deleteAll() {
    return http.delete(`/Student`);
  }

  findByTitle(title) {
    return http.get(`/Student?title=${title}`);
  }
}

export default new StudentDataService();