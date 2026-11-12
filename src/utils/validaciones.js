export const RIOT_ID_REGEX = /^[^#]{3,16}#[A-Za-z0-9]{3,5}$/

export function esRiotIdValido(valor) {
  return RIOT_ID_REGEX.test(valor.trim())
}