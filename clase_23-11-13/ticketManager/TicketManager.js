// Conceptos sueltos (MUY SIMPLIFICADO)
// CLASE: Plantilla o estructura de un objeto
// INSTANCIA: Objeto que posee dicha estructura, con VALORES DEFINIDOS
// CONSTRUCTOR: Función que crea y devuelve una instancia de la clase en cuestión

class Evento {
    static contadorEventos = 0;
    static precioBaseDeGanancia = 0.15;

    // No es necesario utilizar {} como parámetros (React vibes), lo hice sencillamente para poder ignorar el orden de los parámetros (uso de destructuring) y poder usar el spread sin problema como pide la consigna
    constructor({ nombre, localidad, precio = 50, capacidad = 50, fecha = Date.now, participantes = [] }) {
        this.nombre = nombre;
        this.localidad = localidad;
        this.precio = precio * (1 + Evento.precioBaseDeGanancia); // Sigo sin entender la idea de esta variable
        this.capacidad = capacidad;
        this.fecha = fecha;
        this.participantes = participantes;
        this.id = ++Evento.contadorEventos;
    }
}

class TicketManager {
    constructor() {
        this.eventos = [];
    }

    getEventos = () => {
        return this.eventos;
    };

    addEvento = (nombre, localidad, precio = 50, capacidad = 50, fecha = Date.now) => {
        const evento = new Evento({ nombre, localidad, precio, capacidad, fecha }); // Paso el objeto con los valores al constructor

        this.eventos.push(evento);
        return evento.id; // Detalle de color para ser más declarativo
    };

    addUsuario = (idEvento, idUsuario) => {
        // Verifica la existencia del evento
        const evento = this.eventos.find((evento) => evento.id === idEvento);
        if (!evento) {
            console.log("El evento no existe!");
            return;
        }

        // Verifica que el usuario no esté registrado en el evento en cuestión
        const usuarioYaEstaEnEvento = evento.participantes.includes(idUsuario);
        if (usuarioYaEstaEnEvento) {
            console.log("El usuario ya se encuentra en ese evento!");
            return;
        }

        evento.participantes.push(idUsuario);
    };

    setEventoEnGira = (idEvento, localidad, fecha = Date.now) => {
        // Verifica la existencia del evento
        const evento = this.eventos.find((evento) => evento.id === idEvento);
        if (!evento) {
            console.log("El evento no existe!");
            return;
        }

        // Creo nuevo evento copiando las propiedades del anterior (operador spread) y sobreescribo localida y fecha
        const newEventoEnGira = new Evento({ ...evento, localidad, fecha });
        this.eventos.push(newEventoEnGira);

        return evento.id; // Detalle de color para ser más declarativo
    };
}

// Instancio el TicketManager
const ticketManager = new TicketManager();

// Agrego eventos a la lista de eventos, las variables almacenan el id del evento (retornamos evento.id al final de la función addEvento)
const evento1 = ticketManager.addEvento("Concierto de rock", "Madrid", 45, 101, "2021-10-10");
const evento2 = ticketManager.addEvento("Concierto de jazz", "Brooklyn", 45, 102, "2021-11-10");
const evento3 = ticketManager.addEvento("Concierto de blues", "California", 45, 103, "2021-12-10");

// Agrego usuarios a los eventos
ticketManager.addUsuario(evento1, "Santi");
ticketManager.addUsuario(evento1, "Franco");
ticketManager.addUsuario(evento2, "Luis");
ticketManager.addUsuario(evento2, "Paola");
ticketManager.addUsuario(evento3, "Juan");

// Creo un nuevo evento como copia o versión modificada de un existente
const evento4 = ticketManager.setEventoEnGira(evento1, "Barcelona", "2021-10-11");
// Agrego usuario al nuevo evento en gira
ticketManager.addUsuario(evento4, "Francisco");

// Verifico que funcione correctamente
console.log(ticketManager.getEventos());
