import http from "../http-common";

class AllocateSubjectDataService {
  getAll() {
    return http.get("/AllocateSubject");
  }

  get(id) {
    return http.get(`/AllocateSubject/${id}`);
  }

  create(data) {
    return http.post("/AllocateSubject", data, {
      headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    });
  }

  update(data) {
    return http.put("/AllocateSubject", data, {
      headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    });
  }

  delete(studentID) {
    //console.log(studentID);
    return http.delete("/AllocateSubject/"+studentID
    );
  }

  deleteAll() {
    return http.delete(`/AllocateSubject`);
  }

  findByTitle(title) {
    return http.get(`/AllocateSubject?title=${title}`);
  }
}

export default new AllocateSubjectDataService();