var app = angular.module("miApp", [
  "ngRoute",
  "mobile-angular-ui",
  "ngInput",
  "mobile-angular-ui.gestures",
  "angularUUID2"
]);

app.config(function($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: "views/home.html",
    reloadOnSearch: false,
    controller: "pcontroller"
  });

  $routeProvider.when("/cargarmascotas", {
    templateUrl: "views/cargarmascotas.html",
    controller: "cargarmascotas",
    reloadOnSearch: false
  });

  $routeProvider.when("/cargarvacunas", {
    templateUrl: "views/cargarvacunas.html",
    controller: "cargarvacunas",
    reloadOnSearch: false
  });

  $routeProvider.when("/cargarcomidas", {
    templateUrl: "views/cargarcomidas.html",
    controller: "cargarcomidas",
    reloadOnSearch: false
  });
  $routeProvider.when(
    "/editar/:id/:nombre/:edad/:raza/:tipo/:comentarios/:falsoid",
    {
      templateUrl: "views/editar.html",
      reloadOnSearch: false,
      controller: "editar"
    }
  );
  $routeProvider.otherwise({
    redirectTo: "/"
  });
});

app.controller("pcontroller", function(
  $scope,
  $rootScope,
  $http,
  $filter,
  $location,
  uuid2
) {
  $rootScope.salir = function() {
    navigator.notification.confirm(
      "Está seguro que desea salir?",
      onConfirm,
      "",
      "Si,No"
    );

    function onConfirm(button) {
      if (button == 2) {
        return;
      } else {
        navigator.app.exitApp();
      }
    }
  };

  json = localStorage.datos == undefined ? "[ ]" : localStorage.datos;

  $rootScope.dame_lo_que_guarde = JSON.parse(json);

  $scope.editar = function(item) {
    $location.path(
      "/editar/" +
        item.id +
        "/" +
        item.nombre +
        "/" +
        item.edad +
        "/" +
        item.raza +
        "/" +
        item.tipo +
        "/" +
        item.comentarios +
        "/" +
        item.falsoid
    );
  };
  $rootScope.dame_lo_que_guarde = JSON.parse(json);
  $http({
    method: "POST",
    url: "http://adm-arce-milton.atwebpages.com/updateM.php",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: $scope.dame_lo_que_guarde
  }).then(
    function exito(response) {
      localStorage.setItem("datos", JSON.stringify(response.data));
    },
    function fracaso(response) {
      console.log("No se pudo enviar");
    }
  );
  $scope.borrar = function(item) {
    localStorage.removeItem("datos");
    $rootScope.dame_lo_que_guarde.splice(
      $rootScope.dame_lo_que_guarde.indexOf(item),
      1
    );
    $scope.datos_quedan = [];
    angular.forEach($rootScope.dame_lo_que_guarde, function(item) {
      $scope.datos_quedan.push(item);
      localStorage.setItem("datos", JSON.stringify($scope.datos_quedan));
    });

    if (!localStorage.datos_borrados) {
      $scope.array_borrados = [];
    } else {
      $scope.array_borrados = JSON.parse(localStorage.datos_borrados);
    }
    if (item.id != undefined) {
      $scope.array_borrados.push(item.id);
    }
    $http({
      method: "POST",
      url: "http://adm-arce-milton.atwebpages.com/borrarM.php",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: $scope.array_borrados
    }).then(
      function exito(response) {
        localStorage.setItem("datos", JSON.stringify(response.data));
        localStorage.removeItem("datos_borrados");
        $location.path("/");
      },
      function fracaso(response) {
        localStorage.setItem(
          "datos_borrados",
          JSON.stringify($scope.array_borrados)
        );
      }
    );
  };

  $http.get("http://adm-arce-milton.atwebpages.com/traerraza.php").then(
    function exito(respuesta) {
      localStorage.setItem("datosrazas", angular.toJson(respuesta.data));
      $scope.razas = JSON.parse(localStorage.getItem("datosrazas"));
    },
    function error(respuesta) {
      if (localStorage.datos != "undefined" && localStorage.datos != null) {
        $scope.dato = angular.fromJson(localStorage.getItem("datosrazas"));
        $scope.sinconexion = "No hay conexion estas viendo datos local";
      } else {
        $scope.local_vacio = "No hay datos";
      }
    }
  );
  $http.get("http://adm-arce-milton.atwebpages.com/traervacunas.php").then(
    function exito(respuesta) {
      localStorage.setItem("datosvacunas", angular.toJson(respuesta.data));
      $scope.datosv = JSON.parse(localStorage.getItem("datosvacunas"));
    },
    function error(respuesta) {
      if (localStorage.datos != "undefined" && localStorage.datos != null) {
        $scope.dato = angular.fromJson(localStorage.getItem("datosvacunas"));
        $scope.sinconexion = "No hay conexion estas viendo datos local";
      } else {
        $scope.local_vacio = "No hay datos";
      }
    }
  );
  $http.get("http://adm-arce-milton.atwebpages.com/traercomidas.php").then(
    function exito(respuesta) {
      localStorage.setItem("datoscomidas", angular.toJson(respuesta.data));
      $scope.datosc = JSON.parse(localStorage.getItem("datoscomidas"));
    },
    function error(respuesta) {
      if (localStorage.datos != "undefined" && localStorage.datos != null) {
        $scope.dato = angular.fromJson(localStorage.getItem("datoscomidas"));
        $scope.sinconexion = "No hay conexion estas viendo datos local";
      } else {
        $scope.local_vacio = "No hay datos";
      }
    }
  );
  $http.get("http://adm-arce-milton.atwebpages.com/traermascotas.php").then(
    function exito(respuesta) {
      localStorage.setItem("datos", angular.toJson(respuesta.data));
      $scope.mostrar = respuesta.data;
      $scope.exito = " datos traidos con exito ";
    },
    function error(respuesta) {
      if (localStorage.datos != "undefined" && localStorage.datos != null) {
        $scope.dato = angular.fromJson(localStorage.getItem("datos"));
        $scope.sinconexion = "No hay conexion datos local";
      } else {
        $scope.local_vacio = "No hay datos";
      }
    }
  );
});

app.controller("cargarmascotas", function(
  $scope,
  $rootScope,
  $location,
  $http,
  $filter,
  $location,
  uuid2
) {
  $scope.si = true;
  $scope.getId = function() {
    $scope.id = uuid2.newuuid();
    return $scope.id;
  };
  $scope.guardarM = function(datos) {
    $scope.fecha = $filter("date")(new Date(), "yyyy-MM-dd  HH:mm:ss");
    $scope.aguardar = {
      nombre: datos.nombre,
      edad: datos.edad,
      raza: datos.raza,
      tipo: datos.tipo,
      comentarios: datos.comentarios,
      /*imagen: datos.imagen,*/
      fecha_creacion: $scope.fecha,
      falsoid: $scope.getId()
    };
    if (!localStorage.getItem("datos")) {
      $scope.superArray = [];
    } else {
      $scope.superArray = JSON.parse(localStorage.getItem("datos"));
    }
    $scope.superArray.push($scope.aguardar);
    $rootScope.superArray = $scope.superArray;
    var envio = [
      {
        nombre: datos.nombre,
        edad: datos.edad,
        raza: datos.raza,
        tipo: datos.tipo,
        comentarios: datos.comentarios,
        /* imagen: datos.imagen,*/
        fecha_creacion: $scope.fecha,
        falsoid: $scope.getId()
      }
    ];
    $http({
      method: "POST",
      url: "http://adm-arce-milton.atwebpages.com/guardarM.php",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: envio
    }).then(
      function successCallback(response) {
        $scope.respuesta = response.data;
        localStorage.setItem("datos", JSON.stringify(response.data));
        $location.path("/");
      },
      function errorCallback(response) {
        localStorage.setItem("datos", JSON.stringify($rootScope.superArray));
      }
    );
  };
});

app.controller("cargarvacunas", function(
  $scope,
  $rootScope,
  $location,
  $http,
  $filter,
  $location,
  uuid2
) {
  $scope.guardarV = function(datosv) {
    $scope.aguardar = {
      idm: datosv.idm,
      idv: datosv.idv,
      fecha_vacunacion: datosv.fechavac
    };
    if (!localStorage.getItem("datosvm")) {
      $scope.superArray = [];
    } else {
      $scope.superArray = JSON.parse(localStorage.getItem("datosvm"));
    }
    $scope.superArray.push($scope.aguardar);
    $rootScope.superArray = $scope.superArray;
    var envio = [
      {
        idm: datosv.idm,
        idv: datosv.idv,
        fecha_vacunacion: datosv.fechavac
      }
    ];
    $http({
      method: "POST",
      url: "http://adm-arce-milton.atwebpages.com/guardarVM.php",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: envio
    }).then(
      function successCallback(response) {
        $scope.respuesta = response.data;
        localStorage.setItem("datosvm", JSON.stringify(response.data));
        $location.path("/");
      },
      function errorCallback(response) {
        localStorage.setItem("datosvm", JSON.stringify($rootScope.superArray));
      }
    );
  };
  $http.get("http://adm-arce-milton.atwebpages.com/traerrelvacunas.php").then(
    function exito(respuesta) {
      localStorage.setItem("vacunasV", angular.toJson(respuesta.data));
      $scope.mvacunas = respuesta.data;
      $scope.exito = " datos traidos con exito ";
    },
    function error(respuesta) {
      if (localStorage.datos != "undefined" && localStorage.datos != null) {
        $scope.dato = angular.fromJson(localStorage.getItem("vacunasV"));
        $scope.sinconexion = "No hay conexion datos local";
      } else {
        $scope.local_vacio = "No hay datos";
      }
    }
  );
});
app.controller("cargarcomidas", function(
  $scope,
  $rootScope,
  $location,
  $http,
  $filter,
  $location,
  uuid2
) {
  $scope.guardarC = function(datosc) {
    $scope.aguardar = {
      idm: datosc.idm,
      idc: datosc.idc,
      comentarios: datosc.comentarios
    };
    if (!localStorage.getItem("datoscm")) {
      $scope.superArray = [];
    } else {
      $scope.superArray = JSON.parse(localStorage.getItem("datoscm"));
    }
    $scope.superArray.push($scope.aguardar);
    $rootScope.superArray = $scope.superArray;
    var envio = [
      {
        idm: datosc.idm,
        idc: datosc.idc,
        comentarios: datosc.comentarios
      }
    ];
    $http({
      method: "POST",
      url: "http://adm-arce-milton.atwebpages.com/guardarCM.php",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: envio
    }).then(
      function successCallback(response) {
        $scope.respuesta = response.data;
        localStorage.setItem("datoscm", JSON.stringify(response.data));
        $location.path("/");
      },
      function errorCallback(response) {
        localStorage.setItem("datoscm", JSON.stringify($rootScope.superArray));
      }
    );
  };
  $http.get("http://adm-arce-milton.atwebpages.com/traerrelcomidas.php").then(
    function exito(respuesta) {
      localStorage.setItem("comidasC", angular.toJson(respuesta.data));
      $scope.mcomidas = respuesta.data;
      $scope.exito = " datos traidos con exito ";
    },
    function error(respuesta) {
      if (localStorage.datos != "undefined" && localStorage.datos != null) {
        $scope.dato = angular.fromJson(localStorage.getItem("comidasC"));
        $scope.sinconexion = "No hay conexion datos local";
      } else {
        $scope.local_vacio = "No hay datos";
      }
    }
  );
});

app.controller("editar", function(
  $scope,
  $routeParams,
  $location,
  $rootScope,
  $filter,
  $location,
  $http
) {
  $scope.patron = "[0-9]{5}$";

  $scope.parametros = $routeParams;
  $rootScope.superArray = $scope.superArray;

  $scope.update = function(parametros) {
    if (!localStorage.datos) {
      $rootScope.superArray = [];
    } else {
      $rootScope.superArray = JSON.parse(localStorage.datos);
    }

    $scope.editado = {
      id: parametros.id,
      nombre: parametros.nombre,
      edad: parametros.edad,
      raza: parametros.raza,
      tipo: parametros.tipo,
      comentarios: parametros.comentarios,
      falsoid: parametros.falsoid
    };
    $rootScope.superArray = JSON.parse(localStorage.getItem("datos"));

    for (var i = 0; i < $rootScope.superArray.length; i++) {
      if ($scope.editado.creado == $rootScope.superArray[i].creado) {
        $rootScope.superArray.splice(i, 1);
      }
    }

    $rootScope.superArray.push($scope.editado);
    localStorage.setItem("datos", JSON.stringify($rootScope.superArray));
    $rootScope.superArray = JSON.parse(localStorage.datos);
  };

  if ($rootScope.superArray) {
    $http({
      method: "POST",
      url: "http://adm-arce-milton.atwebpages.com/updateM.php",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: $rootScope.superArray
    }).then(
      function exito(response) {
        $scope.respuesta = response.data;
      },
      function fracaso(response) {}
    );
  }
});
