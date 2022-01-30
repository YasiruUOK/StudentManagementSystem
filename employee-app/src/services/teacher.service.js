import http from "../http-common";

class TeacherDataService {
  getAll() {
    return http.get("/Teacher");
  }

  get(id) {
    return http.get(`/Teacher/${id}`);
  }

  create(data) {
    return http.post("/Teacher", data, {
      headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    });
  }

  update(data) {
    //return http.put(`/Teacher/${id}`, data);
    return http.put("/Teacher", data, {
      headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    });
  }

  delete(studentID) {
    //console.log(studentID);
    return http.delete("/Teacher/"+studentID
    );
  }

  deleteAll() {
    return http.delete(`/Teacher`);
  }

  findByTitle(title) {
    return http.get(`/Teacher?title=${title}`);
  }
}

export default new TeacherDataService();