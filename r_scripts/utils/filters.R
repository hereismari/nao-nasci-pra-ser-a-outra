# ESTE SCRIPT TEM COMO OBJETIVO GUARDAR AS FUNÇÕES QUE ENVOLVEM FILTROS DE DADOS COMUNS AOS DEMAIS SCRIPTS.

library(tidyverse)

filter_desistentes = function(df) {
  return(
    df %>% filter(!str_detect(desc_sit_candidato, regex("RENÚNCIA|CANCELAMENTO", ignore_case = FALSE)))
  )
}

filter_ghost_candidates = function(df) {
  df %>%
    filter(total_votos == 0)
}

filter_not_ghost_candidates = function(df) {
  df %>%
    filter(total_votos > 0)
}

filter_get_candidates_fem = function(df) {
  return(
    df %>% filter(str_detect(sexo, regex("FEMININO")))
  )
}

filter_get_candidates_masc = function(df) {
  return(
    df %>% filter(str_detect(sexo, regex("MASCULINO")))
  )
}