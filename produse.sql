DROP TYPE IF EXISTS tipuri_tastaturi;
DROP TYPE IF EXISTS categ_tastatura;
DROP TYPE IF EXISTS tipuri_servicii;

CREATE TYPE tipuri_tastaturi AS ENUM('mecanice', 'membrană', 'hibride');
CREATE TYPE categ_tastatura AS ENUM('gaming', 'office', 'programare', 'ergonomice');
CREATE TYPE tipuri_servicii AS ENUM('lubrifiere', 'curatare', 'reparatii', 'personalizari');

CREATE TABLE IF NOT EXISTS tastaturi (
   id serial PRIMARY KEY,
   nume VARCHAR(50) UNIQUE NOT NULL,
   descriere TEXT,
   pret NUMERIC(8,2) NOT NULL,
   conectivitate VARCHAR(100) NOT NULL,
   iluminare BOOLEAN NOT NULL DEFAULT FALSE,
   layout VARCHAR(50),
   numar_taste INT NOT NULL CHECK (numar_taste > 0),
   tip_serviciu tipuri_servicii DEFAULT 'lubrifiere',
   tip_tastatura tipuri_tastaturi DEFAULT 'mecanice',
   categorie categ_tastatura DEFAULT 'office',
   imagine VARCHAR(300),
   specificatii VARCHAR[],
   data_adaugare TIMESTAMP DEFAULT current_timestamp
);

INSERT INTO tastaturi (nume, descriere, pret, conectivitate, iluminare, layout, numar_taste, tip_serviciu, tip_tastatura, categorie, imagine, specificatii) VALUES 
('Logitech G Pro X', 'Tastatură mecanică compactă și personalizabilă, ideală pentru gaming profesionist', 129.99, 'USB', TRUE, 'QWERTY', 87, 'lubrifiere', 'mecanice', 'gaming', 'logitech-g-pro-x.jpg', '{"lungime=35cm", "greutate=1kg", "compatibilitate=Windows"}'),
('Razer BlackWidow Elite', 'Tastatură mecanică premium cu switch-uri Razer Green', 169.99, 'USB', TRUE, 'QWERTY', 104, 'curatare', 'mecanice', 'gaming', 'razer-blackwidow-elite.jpg', '{"lungime=45cm", "greutate=1.3kg", "compatibilitate=Windows"}'),
('SteelSeries Apex 7 TKL', 'Tastatură mecanică compactă cu switch-uri red linear și iluminare RGB', 159.99, 'USB', TRUE, 'QWERTY', 88, 'reparatii', 'mecanice', 'gaming', 'steelseries-apex-7-tkl.jpg', '{"lungime=35cm", "greutate=1.1kg", "compatibilitate=Windows/Mac/Linux"}'),
('Corsair K95 RGB Platinum XT', 'Tastatură mecanică cu switch-uri Cherry MX Speed, iluminare RGB și 6 taste macro dedicate', 199.99, 'USB', TRUE, 'QWERTY', 110, 'personalizari', 'mecanice', 'gaming', 'corsair-k95-rgb-platinum-xt.jpg', '{"lungime=50cm", "greutate=1.5kg", "compatibilitate=Windows"}'),
('Logitech MX Keys', 'Tastatură wireless cu tastare confortabilă și iluminare inteligentă', 99.99, 'Bluetooth', TRUE, 'QWERTY', 104, 'lubrifiere', 'membrană', 'office', 'logitech-mx-keys.jpg', '{"lungime=43cm", "greutate=1kg", "compatibilitate=Windows/Mac/Linux"}'),
('Apple Magic Keyboard with Numeric Keypad', 'Tastatură wireless cu tastare precisă și tastatură numerică dedicată', 129.99, 'Bluetooth', TRUE, 'QWERTY', 110, 'curatare', 'membrană', 'office', 'apple-magic-keyboard-numeric.jpg', '{"lungime=43cm", "greutate=0.9kg", "compatibilitate=Mac"}'),
('Corsair K65 RGB Mini', 'Tastatură compactă mecanică 60%, iluminată RGB, ideală pentru gaming', 109.99, 'USB', TRUE, 'QWERTY', 61, 'reparatii', 'mecanice', 'gaming', 'corsair-k65-rgb-mini.jpg', '{"lungime=30cm", "greutate=0.7kg", "compatibilitate=Windows"}'),
('Roccat Vulcan 122 AIMO', 'Tastatură mecanică premium cu switch-uri Titan, iluminare RGB și design futurist', 179.99, 'USB', TRUE, 'QWERTY', 104, 'personalizari', 'mecanice', 'gaming', 'roccat-vulcan-122-aimo.jpg', '{"lungime=45cm", "greutate=1.2kg", "compatibilitate=Windows"}'),
('Microsoft Surface Ergonomic Keyboard', 'Tastatură ergonomică cu design curbat și conectivitate Bluetooth', 129.99, 'Bluetooth', FALSE, 'QWERTY', 108, 'lubrifiere', 'membrană', 'ergonomice', 'microsoft-surface-ergonomic-keyboard.jpg', '{"lungime=46cm", "greutate=1.1kg", "compatibilitate=Windows"}'),
('Ducky Shine 7', 'Tastatură mecanică de calitate premium, iluminată RGB', 199.99, 'USB', TRUE, 'QWERTY', 108, 'curatare', 'mecanice', 'gaming', 'ducky-shine-7.jpg', '{"lungime=45cm", "greutate=1.3kg", "compatibilitate=Windows"}'),
('ASUS ROG Strix Scope', 'Tastatură mecanică compactă, iluminată RGB, cu switch-uri Cherry MX Red', 119.99, 'USB', TRUE, 'QWERTY', 87, 'lubrifiere', 'mecanice', 'gaming', 'asus-rog-strix-scope.jpg', '{"lungime=35cm", "greutate=1.1kg", "compatibilitate=Windows"}'),
('SteelSeries Apex Pro', 'Tastatură mecanică premium cu switch-uri ajustabile, iluminare RGB și ecran OLED', 199.99, 'USB', TRUE, 'QWERTY', 104, 'curatare', 'mecanice', 'gaming', 'steelseries-apex-pro.jpg', '{"lungime=45cm", "greutate=1.4kg", "compatibilitate=Windows/Mac/Linux"}'),
('Cooler Master CK550', 'Tastatură mecanică minimalistă, iluminată RGB, cu switch-uri Gateron', 89.99, 'USB', TRUE, 'QWERTY', 104, 'reparatii', 'mecanice', 'gaming', 'cooler-master-ck550.jpg', '{"lungime=45cm", "greutate=1.2kg", "compatibilitate=Windows/Mac/Linux"}'),
('Corsair K63 Wireless', 'Tastatură mecanică compactă, wireless, cu switch-uri Cherry MX Red și iluminare roșie', 109.99, 'Wireless', TRUE, 'QWERTY', 87, 'personalizari', 'mecanice', 'gaming', 'corsair-k63-wireless.jpg', '{"lungime=35cm", "greutate=1.1kg", "compatibilitate=Windows"}'),
('Logitech G213 Prodigy', 'Tastatură membrană cu iluminare RGB, rezistentă la stropire', 49.99, 'USB', TRUE, 'QWERTY', 104, 'lubrifiere', 'membrană', 'gaming', 'logitech-g213-prodigy.jpg', '{"lungime=45cm", "greutate=1.3kg", "compatibilitate=Windows"}'),
('Razer Huntsman Elite', 'Tastatură mecanică cu switch-uri optomecanice, iluminare RGB și palm rest magnetic', 199.99, 'USB', TRUE, 'QWERTY', 104, 'curatare', 'mecanice', 'gaming', 'razer-huntsman-elite.jpg', '{"lungime=45cm", "greutate=1.4kg", "compatibilitate=Windows"}'),
('HyperX Alloy Origins Core', 'Tastatură mecanică compactă, cu switch-uri HyperX Red, iluminare RGB și layout US', 99.99, 'USB', TRUE, 'QWERTY', 87, 'reparatii', 'mecanice', 'gaming', 'hyperx-alloy-origins-core.jpg', '{"lungime=35cm", "greutate=1.1kg", "compatibilitate=Windows"}'),
('Corsair K68 RGB', 'Tastatură membrană iluminată RGB, rezistentă la apă și praf', 79.99, 'USB', TRUE, 'QWERTY', 104, 'personalizari', 'membrană', 'gaming', 'corsair-k68-rgb.jpg', '{"lungime=45cm", "greutate=1.3kg", "compatibilitate=Windows"}'),
('Roccat Suora FX', 'Tastatură mecanică compactă, iluminată RGB, fără layout numeric', 109.99, 'USB', TRUE, 'QWERTY', 87, 'lubrifiere', 'mecanice', 'gaming', 'roccat-suora-fx.jpg', '{"lungime=35cm", "greutate=1.1kg", "compatibilitate=Windows"}'),
('Dell KB216', 'Tastatură membrană simplă, cu design compact și tastare silențioasă', 19.99, 'USB', FALSE, 'QWERTY', 104, 'curatare', 'membrană', 'office', 'dell-kb216.jpg', '{"lungime=45cm", "greutate=0.8kg", "compatibilitate=Windows"}');
('Microsoft Sculpt Ergonomic', 'Tastatură ergonomică ideală pentru birou și utilizare prelungită', 89.99, 'Wireless', FALSE, 'QWERTY', 104, 'curatare', 'membrană', 'ergonomice', 'microsoft-sculpt-ergonomic.jpg', '{"lungime=40cm", "greutate=0.8kg", "compatibilitate=Windows"}'),
('Apple Magic Keyboard', 'Tastatură slim și elegantă, perfectă pentru birou', 99.99, 'Bluetooth', FALSE, 'QWERTY', 78, 'curatare', 'membrană', 'office', 'apple-magic-keyboard.jpg', '{"lungime=27.9cm", "greutate=0.23kg", "compatibilitate=MacOS"}'),
('Razer Ornata V2', 'Tastatură hibridă pentru programatori, combinând avantajele tastaturilor mecanice și cu membrană', 99.99, 'USB', TRUE, 'QWERTY', 104, 'personalizari', 'hibride', 'programare', 'razer-ornata-v2.jpg', '{"lungime=46.3cm", "greutate=0.95kg", "compatibilitate=Windows"}'),
('Logitech K780', 'Tastatură wireless versatilă, ideală pentru birou și utilizare multiplatformă', 79.99, 'Wireless', FALSE, 'QWERTY', 98, 'curatare', 'membrană', 'office', 'logitech-k780.jpg', '{"lungime=38cm", "greutate=0.87kg", "compatibilitate=Windows, MacOS, iOS, Android"}'),
('Kinesis Advantage2', 'Tastatură ergonomică avansată, perfectă pentru programatori', 349.00, 'USB', FALSE, 'QWERTY', 80, 'lubrifiere', 'mecanice', 'programare', 'kinesis-advantage2.jpg', '{"lungime=41cm", "greutate=1.25kg", "compatibilitate=Windows, MacOS, Linux"}'),
('ErgoDox EZ', 'Tastatură programabilă și ergonomică, ideală pentru utilizatori avansați și programatori', 270.00, 'USB', TRUE, 'QWERTY', 76, 'reparatii', 'mecanice', 'ergonomice', 'ergodox-ez.jpg', '{"lungime=38cm", "greutate=1kg", "compatibilitate=Windows, MacOS, Linux"}'),
('Corsair K55 RGB', 'Tastatură de birou cu iluminare RGB și taste silențioase', 49.99, 'USB', TRUE, 'QWERTY', 110, 'curatare', 'membrană', 'office', 'corsair-k55-rgb.jpg', '{"lungime=48cm", "greutate=0.82kg", "compatibilitate=Windows"}'),
('Keychron K8', 'Tastatură hibridă wireless, ideală pentru programare și utilizare multiplatformă', 74.99, 'Bluetooth', TRUE, 'QWERTY', 87, 'personalizari', 'hibride', 'programare', 'keychron-k8.jpg', '{"lungime=35cm", "greutate=0.9kg", "compatibilitate=Windows, MacOS"}');
('Dell KB216', 'Tastatură de birou standard, fiabilă și accesibilă', 19.99, 'USB', FALSE, 'QWERTY', 104, 'curatare', 'membrană', 'office', 'dell-kb216.jpg', '{"lungime=44.2cm", "greutate=0.5kg", "compatibilitate=Windows"}'),
('HP K1500', 'Tastatură cu membrană pentru utilizare zilnică la birou', 14.99, 'USB', FALSE, 'QWERTY', 104, 'curatare', 'membrană', 'office', 'hp-k1500.jpg', '{"lungime=45cm", "greutate=0.6kg", "compatibilitate=Windows"}'),
('ASUS ROG Claymore', 'Tastatură mecanică modulară pentru gaming și programare', 199.99, 'USB', TRUE, 'QWERTY', 87, 'personalizari', 'mecanice', 'programare', 'asus-rog-claymore.jpg', '{"lungime=40cm", "greutate=1.2kg", "compatibilitate=Windows"}'),
('Logitech Ergo K860', 'Tastatură ergonomică curbată, ideală pentru birou și sănătatea încheieturilor', 129.99, 'Wireless', FALSE, 'QWERTY', 104, 'curatare', 'membrană', 'ergonomice', 'logitech-ergo-k860.jpg', '{"lungime=45cm", "greutate=1kg", "compatibilitate=Windows, MacOS"}'),
('Ducky One 2 Mini', 'Tastatură mecanică compactă și performantă, ideală pentru programatori', 99.99, 'USB', TRUE, 'QWERTY', 61, 'lubrifiere', 'mecanice', 'programare', 'ducky-one-2-mini.jpg', '{"lungime=30cm", "greutate=0.6kg", "compatibilitate=Windows, MacOS"}'),
('Redragon K552', 'Tastatură mecanică accesibilă și durabilă, ideală pentru gaming și programare', 39.99, 'USB', TRUE, 'QWERTY', 87, 'curatare', 'mecanice', 'programare', 'redragon-k552.jpg', '{"lungime=35cm", "greutate=0.9kg", "compatibilitate=Windows"}'),
('Perixx PERIBOARD-512', 'Tastatură ergonomică split, ideală pentru confort și sănătate', 49.99, 'USB', FALSE, 'QWERTY', 104, 'curatare', 'membrană', 'ergonomice', 'perixx-periboard-512.jpg', '{"lungime=50cm", "greutate=0.8kg", "compatibilitate=Windows"}'),
('Microsoft Surface Keyboard', 'Tastatură elegantă și subțire pentru birou', 99.99, 'Bluetooth', FALSE, 'QWERTY', 104, 'curatare', 'membrană', 'office', 'microsoft-surface-keyboard.jpg', '{"lungime=42cm", "greutate=0.42kg", "compatibilitate=Windows, MacOS"}'),
('ErgoDox EZ Glow', 'Tastatură mecanică ergonomică cu iluminare RGB, ideală pentru programatori', 299.99, 'USB', TRUE, 'QWERTY', 76, 'personalizari', 'mecanice', 'ergonomice', 'ergodox-ez-glow.jpg', '{"lungime=38cm", "greutate=1kg", "compatibilitate=Windows, MacOS, Linux"}'),
('Anne Pro 2', 'Tastatură mecanică wireless compactă, ideală pentru gaming și programare', 89.99, 'Bluetooth', TRUE, 'QWERTY', 61, 'lubrifiere', 'mecanice', 'programare', 'anne-pro-2.jpg', '{"lungime=28.5cm", "greutate=0.63kg", "compatibilitate=Windows, MacOS"}');


CREATE USER denis WITH ENCRYPTED PASSWORD 'denis';
GRANT ALL PRIVILEGES ON DATABASE cti_2024 TO denis ;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO denis;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO denis;