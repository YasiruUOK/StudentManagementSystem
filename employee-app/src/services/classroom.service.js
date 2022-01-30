import http from "../http-common";

class ClassRoomDataService {
  getAll() {
    return http.get("/Classroom");
  }

  get(id) {
    return http.get(`/Classroom/${id}`);
  }

  create(data) {
    return http.post("/Classroom", data, {
      headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    });
  }

  update(data) {
    return http.put("/Classroom", data, {
      headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    });
  }

  delete(studentID) {
    //console.log(studentID);
    return http.delete("/Classroom/"+studentID
    );
  }

  deleteAll() {
    return http.delete(`/Classroom`);
  }

  findByTitle(title) {
    return http.get(`/Classroom?title=${title}`);
  }
}

export default new ClassRoomDataService();