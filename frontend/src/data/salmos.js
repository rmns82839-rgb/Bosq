/**
 * Salmos devocionales — selección para preparar devocionales y cultos.
 * Contenido base (autor, contexto, idea central) escrito como síntesis
 * fiel al texto; NO son citas de comentaristas. Para el comentario real
 * de Spurgeon (El Tesoro de David) cada salmo tiene su botón a la fuente.
 *
 * evoca: agradecimiento | oracion | alabanza | confianza | perdon | adoracion
 * servicios: oracion(martes) | ensenanza(jueves) | alabanza(sabado) |
 *            escuela(domingo) | evangelistico | misionero
 * versiculoClave: referencia (se abre en RVR1960); no reproducimos el texto.
 */
export const SALMOS = [
  {
    id: 'sal-8', numero: 8, nombre: '¡Cuán glorioso es tu nombre!',
    autor: 'David',
    contexto: 'Un himno de contemplación nocturna: David mira los cielos, la luna y las estrellas, y se asombra de que el Dios inmenso se fije en el hombre.',
    versiculoClave: 'Salmo 8:4', evoca: 'adoracion',
    servicios: ['alabanza', 'escuela', 'misionero'],
    ideaCentral: 'La grandeza de Dios en la creación realza la dignidad que Él le dio al ser humano: fuimos coronados de gloria para gobernar Su obra. Enseña adoración humilde y propósito.',
  },
  {
    id: 'sal-19', numero: 19, nombre: 'Los cielos cuentan la gloria',
    autor: 'David',
    contexto: 'Dos revelaciones en un solo salmo: la creación que proclama a Dios sin palabras, y la Ley del Señor que convierte el alma.',
    versiculoClave: 'Salmo 19:7', evoca: 'adoracion',
    servicios: ['ensenanza', 'escuela'],
    ideaCentral: 'Dios se revela por la naturaleza y, con más claridad, por Su Palabra perfecta. La meta del creyente: que las palabras de su boca y la meditación de su corazón agraden a Dios.',
  },
  {
    id: 'sal-23', numero: 23, nombre: 'Jehová es mi pastor',
    autor: 'David',
    contexto: 'El salmo más amado: David, que fue pastor, describe a Dios cuidándolo como él cuidó sus ovejas, aun en el valle de sombra de muerte.',
    versiculoClave: 'Salmo 23:1', evoca: 'confianza',
    servicios: ['oracion', 'evangelistico'],
    ideaCentral: 'Con el Señor como pastor, nada falta: provee, guía, restaura y acompaña hasta la casa eterna. Ideal para consolar y para invitar a confiar en Cristo, el Buen Pastor.',
  },
  {
    id: 'sal-27', numero: 27, nombre: 'Jehová es mi luz y mi salvación',
    autor: 'David',
    contexto: 'David, rodeado de enemigos, declara que no temerá porque su única búsqueda es habitar en la presencia de Dios.',
    versiculoClave: 'Salmo 27:1', evoca: 'confianza',
    servicios: ['oracion', 'alabanza'],
    ideaCentral: 'La confianza vence al miedo cuando lo único que se anhela es a Dios mismo. Termina con un llamado a esperar en Jehová con valentía.',
  },
  {
    id: 'sal-32', numero: 32, nombre: 'La dicha del perdón',
    autor: 'David',
    contexto: 'Salmo (masquil) de enseñanza escrito tras experimentar el peso del pecado callado y el alivio de confesarlo.',
    versiculoClave: 'Salmo 32:1', evoca: 'perdon',
    servicios: ['ensenanza', 'oracion'],
    ideaCentral: 'Callar el pecado enferma; confesarlo trae perdón y libertad. La verdadera bienaventuranza no es no haber pecado, sino ser perdonado.',
  },
  {
    id: 'sal-34', numero: 34, nombre: 'Engrandeced a Jehová conmigo',
    autor: 'David',
    contexto: 'Escrito cuando David fingió locura ante Abimelec (Aquis) para salvar su vida (1 Samuel 21); rebosa gratitud por haber sido librado.',
    versiculoClave: 'Salmo 34:8', evoca: 'agradecimiento',
    servicios: ['alabanza', 'evangelistico'],
    ideaCentral: 'La experiencia del rescate se vuelve testimonio: "gustad y ved que es bueno Jehová". Invita a otros a probar la bondad de Dios en medio de la aflicción.',
  },
  {
    id: 'sal-42', numero: 42, nombre: 'Como el ciervo brama',
    autor: 'Hijos de Coré',
    contexto: 'El clamor de un alma lejos de la casa de Dios, sedienta de Su presencia, que se predica a sí misma esperanza en medio del desánimo.',
    versiculoClave: 'Salmo 42:1', evoca: 'oracion',
    servicios: ['oracion', 'alabanza'],
    ideaCentral: 'La sed de Dios es la marca del alma viva. Cuando el ánimo se abate, el creyente habla a su propia alma: "espera en Dios". Excelente para el clamor y la restauración.',
  },
  {
    id: 'sal-46', numero: 46, nombre: 'Dios es nuestro amparo',
    autor: 'Hijos de Coré',
    contexto: 'Himno de confianza en medio del caos: aunque tiemble la tierra y bramen las naciones, Dios está en medio de Su pueblo. Inspiró a Lutero ("Castillo fuerte").',
    versiculoClave: 'Salmo 46:1', evoca: 'confianza',
    servicios: ['oracion', 'ensenanza'],
    ideaCentral: 'Dios es refugio presente en la tribulación. El llamado central: "Estad quietos, y conoced que yo soy Dios". Paz en medio de la tormenta.',
  },
  {
    id: 'sal-51', numero: 51, nombre: 'Ten piedad de mí, oh Dios',
    autor: 'David',
    contexto: 'La gran oración de arrepentimiento, escrita después de que el profeta Natán lo confrontó por su pecado con Betsabé (2 Samuel 12).',
    versiculoClave: 'Salmo 51:10', evoca: 'perdon',
    servicios: ['oracion', 'ensenanza'],
    ideaCentral: 'El pecado se confiesa sin excusas y se clama por un corazón limpio y un espíritu recto. Dios no desprecia el corazón contrito y humillado. Modelo de arrepentimiento genuino.',
  },
  {
    id: 'sal-63', numero: 63, nombre: 'Dios, tú eres mi Dios',
    autor: 'David',
    contexto: 'Compuesto en el desierto de Judá: en la aridez física, David expresa una sed espiritual de Dios más fuerte que la del cuerpo.',
    versiculoClave: 'Salmo 63:1', evoca: 'adoracion',
    servicios: ['oracion', 'alabanza'],
    ideaCentral: 'Buscar a Dios de madrugada y hallar que Su misericordia es mejor que la vida. La adoración nace del anhelo, no de la abundancia.',
  },
  {
    id: 'sal-84', numero: 84, nombre: '¡Cuán amables son tus moradas!',
    autor: 'Hijos de Coré',
    contexto: 'El anhelo del peregrino por los atrios de Dios; un día en Su casa vale más que mil fuera de ella.',
    versiculoClave: 'Salmo 84:10', evoca: 'adoracion',
    servicios: ['alabanza', 'escuela'],
    ideaCentral: 'La presencia de Dios es el mayor deleite; el camino hacia ella, aunque pase por valles de lágrimas, se vuelve fuente de fuerza. Adoración anhelante.',
  },
  {
    id: 'sal-90', numero: 90, nombre: 'Señor, tú nos has sido refugio',
    autor: 'Moisés',
    contexto: 'El salmo más antiguo del salterio: Moisés contrasta la eternidad de Dios con la brevedad y fragilidad de la vida humana.',
    versiculoClave: 'Salmo 90:12', evoca: 'oracion',
    servicios: ['ensenanza', 'oracion'],
    ideaCentral: 'Contar bien nuestros días nos da un corazón sabio. Ante lo efímero de la vida, pedimos que Dios afirme la obra de nuestras manos. Reflexión sobre el tiempo y la eternidad.',
  },
  {
    id: 'sal-91', numero: 91, nombre: 'El que habita al abrigo del Altísimo',
    autor: 'Anónimo',
    contexto: 'Un salmo de protección: quien se refugia en Dios encuentra amparo seguro frente al peligro, la plaga y el terror.',
    versiculoClave: 'Salmo 91:1', evoca: 'confianza',
    servicios: ['oracion', 'evangelistico'],
    ideaCentral: 'La seguridad no está en la ausencia de peligro, sino en la presencia de Dios como refugio. Poderoso para momentos de temor y para invitar a morar en Él.',
  },
  {
    id: 'sal-96', numero: 96, nombre: 'Cantad a Jehová, toda la tierra',
    autor: 'Anónimo',
    contexto: 'Un llamado universal a la adoración: proclamar Su gloria entre las naciones y anunciar Su salvación de día en día.',
    versiculoClave: 'Salmo 96:3', evoca: 'alabanza',
    servicios: ['misionero', 'alabanza'],
    ideaCentral: 'La alabanza tiene alcance misionero: anunciar entre los pueblos que Jehová reina. Une adoración y misión en un solo cántico.',
  },
  {
    id: 'sal-100', numero: 100, nombre: 'Cantad alegres a Dios',
    autor: 'Anónimo',
    contexto: 'Breve salmo de acción de gracias, invitación a entrar por Sus puertas con alabanza y a servir a Dios con alegría.',
    versiculoClave: 'Salmo 100:4', evoca: 'agradecimiento',
    servicios: ['alabanza', 'escuela'],
    ideaCentral: 'Servir a Dios con alegría porque Él es bueno y Su misericordia es para siempre. Perfecto para abrir un culto con gratitud.',
  },
  {
    id: 'sal-103', numero: 103, nombre: 'Bendice, alma mía, a Jehová',
    autor: 'David',
    contexto: 'David convoca a su propia alma a no olvidar los beneficios de Dios: perdón, sanidad, redención y compasión de Padre.',
    versiculoClave: 'Salmo 103:2', evoca: 'agradecimiento',
    servicios: ['alabanza', 'oracion'],
    ideaCentral: 'La gratitud se cultiva recordando lo que Dios ha hecho. Su amor es tan alto como los cielos y remueve el pecado tan lejos como el oriente del occidente.',
  },
  {
    id: 'sal-121', numero: 121, nombre: 'Alzaré mis ojos a los montes',
    autor: 'Anónimo',
    contexto: 'Cántico gradual del peregrino que sube a Jerusalén: su ayuda no viene de los montes, sino del Creador que no duerme.',
    versiculoClave: 'Salmo 121:2', evoca: 'confianza',
    servicios: ['oracion', 'misionero'],
    ideaCentral: 'El Guardador de Israel cuida cada paso, de día y de noche, en la salida y la entrada. Salmo de confianza para el que camina o emprende un viaje.',
  },
  {
    id: 'sal-130', numero: 130, nombre: 'De lo profundo clamo',
    autor: 'Anónimo',
    contexto: 'Cántico gradual penitencial ("De profundis"): desde el abismo de la culpa, el alma clama y espera en el perdón abundante de Dios.',
    versiculoClave: 'Salmo 130:3', evoca: 'perdon',
    servicios: ['oracion', 'ensenanza'],
    ideaCentral: 'Si Dios mirara los pecados, nadie subsistiría; pero en Él hay perdón, para que sea reverenciado. Del fondo del pozo a la esperanza segura.',
  },
  {
    id: 'sal-139', numero: 139, nombre: 'Oh Jehová, tú me has examinado',
    autor: 'David',
    contexto: 'Meditación sobre un Dios que lo conoce todo, está en todo lugar y formó al ser humano en el vientre con asombroso cuidado.',
    versiculoClave: 'Salmo 139:14', evoca: 'adoracion',
    servicios: ['ensenanza', 'oracion'],
    ideaCentral: 'Ser plenamente conocido y aun así amado por Dios lleva a la adoración y a una entrega sincera: "examíname y guíame en el camino eterno".',
  },
  {
    id: 'sal-150', numero: 150, nombre: 'Todo lo que respira alabe a JAH',
    autor: 'Anónimo',
    contexto: 'La gran doxología que cierra el salterio: un crescendo de alabanza con todo instrumento y todo aliento.',
    versiculoClave: 'Salmo 150:6', evoca: 'alabanza',
    servicios: ['alabanza', 'escuela'],
    ideaCentral: 'La existencia entera culmina en alabanza: alabar a Dios por Sus proezas y por Su grandeza. El destino de todo lo que respira.',
  },
]

export function getSalmos() {
  return Promise.resolve(SALMOS)
}