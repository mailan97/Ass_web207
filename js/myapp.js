const app = angular.module("myapp", ["ngRoute"]);

app.config(function($routeProvider) {
    // $locationProvider.hashPrefix("");
    $routeProvider
        .when("/home", {
            templateUrl: 'home.html',
            controller: 'subject_Ctrl'
        })
        .when("/dangnhap", {
            templateUrl: 'dangnhap.html',
            controller: 'dn_Ctrl'
        })
        .when("/dangky", {
            templateUrl: 'dangky.html',
            controller: 'user_Ctrl'
        })
        .when("/doimk", {
            templateUrl: 'doimk.html',
        })
        .when("/quenmk", {
            templateUrl: 'quenmk.html',
        })
        .when("/doimk", {
            templateUrl: 'doimk.html',
        })
        .when("/capnhaths", {
            templateUrl: 'capnhaths.html',
        })
        .when("/gioithieu", {
            templateUrl: 'gioithieu.html',
        })
        .when("/lienhe", {
            templateUrl: 'lienhe.html',
        })
        .when("/gopy", {
            templateUrl: 'gopy.html',
        })
        .when("/hoidap", {
            templateUrl: 'hoidap.html',
        })
        .when("/admin", {
            templateUrl: 'admin.html',
            controller: 'qlus_Ctrl'
        });

});

function subjectCtrl($scope, $http) {
    $scope.list_subject = [];
    $http.get('db/Subjects.js').then(function(response) {
        $scope.list_subject = response.data
    });
}

function studentCtrl($scope, $http) {
    $scope.list_student = [];
    $http.get('db/Students.js').then(function(response) {
        $scope.list_student = response.data;
    });
}

function userCtrl($scope, $rootScope, $http) {
    $rootScope.dk = false;
    $scope.students = [];
    $scope.student = {};
    $scope.isLoading = false;
    const api = 'https://62149a6789fad53b1f187b5e.mockapi.io/user';

    $scope.isLoading = true;
    $http.get(api)
        .then(function(response) {
            $scope.isLoading = false;
            $scope.students = response.data;
        })
        .catch(function(error) {
            console.error(error);
            $scope.isLoading = false;
        });

    $scope.dangky = function() {
        // event.preventDefault();
        var data = {
            username: $scope.user.username,
            password: $scope.user.password,
            fullname: $scope.user.fullname,
            sdt: $scope.user.sdt,
            email: $scope.user.email,
            gioi_tinh: $scope.user.gioi_tinh
        }
        $scope.isLoading = true;
        $http.post(api, data)
            .then(function(response) {
                $scope.isLoading = false;
                const sv = response.data;
                $scope.students.push(sv);
                alert('????ng k?? th??nh c??ng');
                document.location = "index.html#!/dangnhap";
            });

    }
}

function dnCtrl($scope, $rootScope, $http) {
    $rootScope.dn = false;
    $scope.students = [];
    $scope.student = {};
    $rootScope.fullName = '';
    $scope.inStatus = false;
    const api = 'https://62149a6789fad53b1f187b5e.mockapi.io/user';

    $http.get(api)
        .then(function(response) {
            $scope.students = response.data;
            console.log(response.data);
        })
        .catch(function(error) {
            console.error(error);
        });

    $scope.dangnhap = function() {
        tb = false;
        let a = $scope.user.username;
        let b = $scope.user.password;
        for (let i = 0; i < $scope.students.length; i++) {
            if (a == $scope.students[i].username && b == $scope.students[i].password) {
                tb = true;
                $rootScope.student = $scope.students[i];
                $rootScope.fullName = $scope.students[i].fullname;
                break;
                // $rootScope.dn = true;
            }
        }
        if (tb == true) {
            alert("????ng nh???p th??nh c??ng");
            $scope.inStatus = true;
            document.location = "index.html#!/home";
        } else {
            alert("????ng nh???p th???t b???i");
        }
    }
}

function qlusCtrl($scope, $http) {
    // Kh???i t???o
    $scope.students = [];
    $scope.isSuccess = true;
    $scope.message = "";
    $scope.user = {
        id: "",
        username: "",
        password: "",
        fullname: "",
        sdt: "",
        email: "",
        gioi_tinh: ""
    };
    $scope.isLoading = false;
    const api = 'https://62149a6789fad53b1f187b5e.mockapi.io/user';

    $scope.isLoading = true;
    $http.get(api) // G???i 1 request d???ng GET l??n API
        .then(function (response) {
            $scope.students = response.data;
            $scope.totalPage = Math.ceil($scope.students.length / 10);
            $scope.isLoading = false;
        })
        .catch(function (error) {
            console.log(error);
            $scope.isLoading = false;
        });

    // TODO
    // if (index == -1) {
    //     // them moi
    // } else {
    //     // cap nhat
    // }

    $scope.onSubmitForm = function (event) {
        event.preventDefault();

        $scope.isLoading = true;
        // G???i request d???ng POST k??m data l??n API
        $http.post(api, $scope.user)
            .then(function (response) {
                // T???t loading
                $scope.isLoading = false;

                // Th??ng b??o
                $scope.message = "Th??m m???i th??nh c??ng";
                $scope.isSuccess = true;

                // Th??m v??o b???ng
                $scope.students.push(response.data);
            })
            .catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
                $scope.message = "Th??m m???i th???t b???i";
                $scope.isSuccess = false;
            });
    }

    $scope.onDelete = function (id, index) {
        console.log(id);
        const deleteAPI = api + '/' + id;
        $scope.isLoading = true;
        $http.delete(deleteAPI)
            .then(function (response) {
                $scope.isLoading = false;
                $scope.students.splice(index, 1);
                // splice -> x??a trong $scope.students

                $("#modal_delete_" + id).modal('hide');
            })
            .catch(function (error) { 
                console.error(error)
            })
    }
};



app.controller("subject_Ctrl", subjectCtrl);
app.controller("student_Ctrl", studentCtrl);
app.controller("user_Ctrl", userCtrl);
app.controller("dn_Ctrl", dnCtrl);
app.controller("qlus_Ctrl", qlusCtrl);