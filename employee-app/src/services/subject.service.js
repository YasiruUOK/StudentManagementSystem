import http from "../http-common";

class SubjectDataService {
  getAll() {
    return http.get("/Subject");
  }

  get(id) {
    return http.get(`/Subject/${id}`);
  }

  create(data) {
    return http.post("/Subject", data, {
      headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    });
  }

  update(data) {
    return http.put("/Subject", data, {
      headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    });
  }

  delete(studentID) {
    //console.log(studentID);
    return http.delete("/Subject/"+studentID
    );
  }

  deleteAll() {
    return http.delete(`/Subject`);
  }

  findByTitle(title) {
    return http.get(`/Subject?title=${title}`);
  }
}

export default new SubjectDataService();