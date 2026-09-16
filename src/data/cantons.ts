export type CantonId =
  | 'ZH' | 'BE' | 'LU' | 'UR' | 'SZ' | 'OW' | 'NW' | 'GL' | 'ZG' | 'FR'
  | 'SO' | 'BS' | 'BL' | 'SH' | 'AR' | 'AI' | 'SG' | 'GR' | 'AG' | 'TG'
  | 'TI' | 'VD' | 'VS' | 'NE' | 'GE' | 'JU';

export interface Canton {
  id: CantonId;
  name: string;
  capital: string;
  joined: number;
  fact: string;
}

export const CANTONS: Canton[] = [
  { id: 'ZH', name: 'Zürich', capital: 'Zürich', joined: 1351, fact: 'Der grösste Kanton der Schweiz nach Einwohnerzahl.' },
  { id: 'BE', name: 'Bern', capital: 'Bern', joined: 1353, fact: 'Bern ist die Bundesstadt der Schweiz.' },
  { id: 'LU', name: 'Luzern', capital: 'Luzern', joined: 1332, fact: 'Bekannt für die berühmte Kapellbrücke.' },
  { id: 'UR', name: 'Uri', capital: 'Altdorf', joined: 1291, fact: 'Einer der drei Urkantone der Schweiz.' },
  { id: 'SZ', name: 'Schwyz', capital: 'Schwyz', joined: 1291, fact: 'Die Schweiz hat ihren Namen von diesem Kanton.' },
  { id: 'OW', name: 'Obwalden', capital: 'Sarnen', joined: 1291, fact: 'Ein Halbkanton mitten in den Bergen.' },
  { id: 'NW', name: 'Nidwalden', capital: 'Stans', joined: 1291, fact: 'Heimat des Klausenpasses und schöner Alpenseen.' },
  { id: 'GL', name: 'Glarus', capital: 'Glarus', joined: 1352, fact: 'Zeigt den heiligen Fridolin auf seiner Flagge.' },
  { id: 'ZG', name: 'Zug', capital: 'Zug', joined: 1352, fact: 'Der kleinste Kanton nach Fläche im Mittelland.' },
  { id: 'FR', name: 'Freiburg', capital: 'Fribourg', joined: 1481, fact: 'Ein zweisprachiger Kanton, Deutsch und Französisch.' },
  { id: 'SO', name: 'Solothurn', capital: 'Solothurn', joined: 1481, fact: 'Bekannt für die schöne Barockstadt.' },
  { id: 'BS', name: 'Basel-Stadt', capital: 'Basel', joined: 1501, fact: 'Der Baselstab ist ein Bischofsstab.' },
  { id: 'BL', name: 'Basel-Landschaft', capital: 'Liestal', joined: 1501, fact: 'Trennte sich 1833 von Basel-Stadt.' },
  { id: 'SH', name: 'Schaffhausen', capital: 'Schaffhausen', joined: 1501, fact: 'Der Rheinfall liegt in diesem Kanton.' },
  { id: 'AR', name: 'Appenzell Ausserrhoden', capital: 'Herisau', joined: 1513, fact: 'Bekannt für Hügellandschaften und Alpaufzüge.' },
  { id: 'AI', name: 'Appenzell Innerrhoden', capital: 'Appenzell', joined: 1513, fact: 'Der kleinste Kanton nach Einwohnerzahl.' },
  { id: 'SG', name: 'St. Gallen', capital: 'St. Gallen', joined: 1803, fact: 'Berühmt für seine Stiftsbibliothek.' },
  { id: 'GR', name: 'Graubünden', capital: 'Chur', joined: 1803, fact: 'Der flächenmässig grösste Kanton der Schweiz.' },
  { id: 'AG', name: 'Aargau', capital: 'Aarau', joined: 1803, fact: 'Drei Flüsse fliessen durch diesen Kanton.' },
  { id: 'TG', name: 'Thurgau', capital: 'Frauenfeld', joined: 1803, fact: 'Bekannt als Obstgarten der Schweiz.' },
  { id: 'TI', name: 'Tessin', capital: 'Bellinzona', joined: 1803, fact: 'Der einzige italienischsprachige Kanton.' },
  { id: 'VD', name: 'Waadt', capital: 'Lausanne', joined: 1803, fact: 'Heimat des Internationalen Olympischen Komitees.' },
  { id: 'VS', name: 'Wallis', capital: 'Sion', joined: 1815, fact: 'Das Matterhorn steht in diesem Kanton.' },
  { id: 'NE', name: 'Neuenburg', capital: 'Neuchâtel', joined: 1815, fact: 'Bekannt für Uhrmacherei und Schokolade.' },
  { id: 'GE', name: 'Genf', capital: 'Genève', joined: 1815, fact: 'Sitz vieler internationaler Organisationen.' },
  { id: 'JU', name: 'Jura', capital: 'Delémont', joined: 1979, fact: 'Der jüngste Kanton der Schweiz.' },
];

export const getCanton = (id: CantonId): Canton => CANTONS.find((c) => c.id === id)!;
