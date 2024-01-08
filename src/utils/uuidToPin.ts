export default function uuidToPin(uuid: string): string {
  // Elimina guiones y convierte los primeros 12 caracteres del UUID en una cadena hexadecimal
  const uuidHex = uuid.replace(/-/g, '').slice(0, 12);

  // Convierte la cadena hexadecimal en un número entero
  const uuidNumber = parseInt(uuidHex, 16);

  // Toma los últimos 6 dígitos del número y asegura con padStart si es necesario de que sea de 6 dígitos
  const pin = (uuidNumber % 1000000).toString().padStart(6, '0');

  return pin;
}
