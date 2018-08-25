library(tidyverse)
library(data.table)

filter_desistentes = function(df) {
  return(
    df %>% filter(!str_detect(desc_sit_candidato, regex("RENÚNCIA|CANCELAMENTO", ignore_case = FALSE)))
  )
}

filter_get_candidates_fem = function(df) {
  return(
    df %>% filter(str_detect(sexo, regex("FEMININO")))
  )
}

filter_ghost_candidates = function(df) {
  df %>%
    filter(total_votos == 0)
}

filter_get_candidates_masc = function(df) {
  return(
    df %>% filter(str_detect(sexo, regex("MASCULINO")))
  )
}

get_ghost_candidates = function(df) {
  df %>% 
    group_by(ano_eleicao, sigla_partido, sigla_uf) %>%
    mutate(
    total_candidate_fem = nrow(df %>% filter_get_candidates_fem),
    total_candidate_masc = nrow(df %>% filter_get_candidates_masc),
    total_ghosts_fem = nrow(df %>% filter_get_candidates_fem %>% filter_ghost_candidates),
    total_ghosts_masc = nrow(df %>% filter_get_candidates_masc %>% filter_ghost_candidates)
  )
}


data <- readr::read_csv2(here::here("data/preprocessed/candidatos.csv"),
                         local=readr::locale("br"))

data <- data %>% filter_desistentes() %>% get_ghost_candidates()

mulheres <-  data %>% filter(sexo == "FEMININO") %>% 
  distinct() 

mulheres <- data.table::data.table(mulheres)  

homens <- data %>% filter(sexo == "MASCULINO") %>%
  distinct() 

homens <- homens %>% data.table::data.table() 

sumario_total <- merge(mulheres %>%
                            filter(total_votos == 0) %>% 
                            group_by(ano_eleicao, sigla_partido, sigla_uf) %>%
                            summarise(cont_candidatas_zero_voto = n()), 
                          mulheres %>% 
                            filter(total_votos != 0) %>% 
                            group_by(ano_eleicao, sigla_partido, sigla_uf) %>%
                            summarise(cont_candidatas_algum_voto = n()), 
                          by=c("ano_eleicao", "sigla_partido", "sigla_uf")) %>%
  merge(homens %>%
          group_by(ano_eleicao, sigla_partido, sigla_uf) %>%
          summarise(total_candidatos = n()),
          by=c("ano_eleicao", "sigla_partido", "sigla_uf"))

sumario_total <- sumario_total %>% 
  mutate(
    total_candidatas = cont_candidatas_zero_voto + cont_candidatas_algum_voto,
    proporcao_mulheres = total_candidatas * 100 / total_candidatos) 

write.csv2(sumario_total, here::here("data/preprocessed/all_mulheres_sumario.csv"), row.names = FALSE)
