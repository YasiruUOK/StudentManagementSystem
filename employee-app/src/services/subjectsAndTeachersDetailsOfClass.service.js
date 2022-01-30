import http from "../http-common";

class SubjectsAndTeachersDetailsOfClass {
  getAll() {
    return http.get("/SubjectsAndTeachersDetailsOfClass");
  }

  get(id) {
    return http.get("/SubjectsAndTeachersDetailsOfClass/"+id);
  }

  create(data) {
    return http.post("/SubjectsAndTeachersDetailsOfClass", data, {
      headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    });
  }

  update(data) {
    //return http.put(`/Teacher/${id}`, data);
    return http.put("/SubjectsAndTeachersDetailsOfClass", data, {
      headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    });
  }

  delete(studentID) {
    //console.log(studentID);
    return http.delete("/SubjectsAndTeachersDetailsOfClass/"+studentID
    );
  }

  deleteAll() {
    return http.delete(`/SubjectsAndTeachersDetailsOfClass`);
  }

  findByTitle(title) {
    return http.get(`/SubjectsAndTeachersDetailsOfClass?title=${title}`);
  }
}

export default new SubjectsAndTeachersDetailsOfClass();