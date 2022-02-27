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
                alert('Đăng ký thành công');
                document.location = "dangnhap.html";
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
            alert("Đăng nhập thành công");

            $scope.inStatus = true;
            document.location = "index.html#!/home";
            console.log($scope.fullName);
        } else {
            alert("Đăng nhập thất bại");
        }
    }
}




app.controller("subject_Ctrl", subjectCtrl);
app.controller("student_Ctrl", studentCtrl);
app.controller("user_Ctrl", userCtrl);
app.controller("dn_Ctrl", dnCtrl);