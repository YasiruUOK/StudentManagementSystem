import http from "../http-common";

class AllocateClassRoomDataService {
  getAll() {
    return http.get("/AllocateClassroom");
  }

  get(id) {
    return http.get(`/AllocateClassroom/${id}`);
  }

  create(data) {
    return http.post("/AllocateClassroom", data, {
      headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    });
  }

  update(data) {
    return http.put("/AllocateClassroom", data, {
      headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    });
  }

  delete(studentID) {
    //console.log(studentID);
    return http.delete("/AllocateClassroom/"+studentID
    );
  }

  deleteAll() {
    return http.delete(`/AllocateClassroom`);
  }

  findByTitle(title) {
    return http.get(`/AllocateClassroom?title=${title}`);
  }
}

export default new AllocateClassRoomDataService();