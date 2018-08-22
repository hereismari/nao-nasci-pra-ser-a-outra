library(tidyverse)
library(data.table)

receitas_candidatos_2016 <- 
  readr::read_csv2(here::here("data/prestacao_brasil/receitas_candidatos_prestacao_contas_final_2016_brasil.csv"),
                                             local=readr::locale(encoding="latin1")) %>%
  data.table()
receitas_candidatos_2014 <- 
  readr::read_csv2(here::here("data/prestacao_final_2014/receitas_candidatos_2014_brasil.csv"),
                                             local=readr::locale(encoding="latin1")) %>%
  data.table()
all_munzona_candidatos_data <- 
  readr::read_csv2(here::here("all_munzona_candidatos_2016.csv"),
                                                local=readr::locale(encoding="latin1")) %>%
  data.table()

generos_2016 <- readr::read_csv(here::here("data/generos_processados/genero_2016.csv")) %>%
  data.table() %>%
  select(-c(sigla_uf, des_situacao_candidatura))

formata_colunas_receitas <- function(receitas) {
  to_underscore <- function(x) {
    gsub('([A-Za-z])([A-Z])([a-z])', '\\1_\\2\\3', x) %>%
      gsub('\\s+', '_', .) %>%
      gsub('.', '_', ., fixed = TRUE) %>%
      gsub('([a-z])([A-Z])', '\\1_\\2', .) %>%
      tolower()
  }
  
  new_names = names(receitas) %>%
    to_underscore()
  
  names(receitas) <- new_names
}

receita_total_por_candidato <- function(receita, candidatos, genero) {
  
  receita <- 
    receita %>%
    rename("numero_cand" = "numero_candidato") %>%
    dplyr::group_by(cpf_do_candidato, nome_candidato, numero_cand) %>%
    summarise(verba_por_candidato = sum(valor_receita)) 
  
  receitas_por_candidatos_merged <- 
    merge(receita, candidatos, by = c("numero_cand", "nome_candidato"))
  
  merge(receitas_por_candidatos_merged, genero, by = c("numero_cand", "nome_municipio", "descricao_cargo"))
}

receita_total_por_candidato <- function(receita, candidatos, genero) {
  #Quanto cada candidato teve de receita dada pelo partido
  receita <-
    receita %>%
    filter(tipo_receita == "Recursos de partido político") %>%
    rename("numero_cand" = "numero_candidato") %>%
    dplyr::group_by(cpf_do_candidato, nome_candidato, numero_cand) %>%
    summarise(verba_por_candidato = sum(valor_receita)) 
  
  receitas_por_candidatos_dadas_pelo_partido_merged <-
    merge(receita, candidatos, by = c("numero_cand", "nome_candidato"))
   
 merge(receitas_por_candidatos_dadas_pelo_partido_merged, genero, by = c("numero_cand", "nome_municipio", "descricao_cargo"))
}


write_csv(receita_total_por_candidato(receitas_candidatos_2016, all_munzona_candidatos_data, generos_2016),
          "receitas_por_candidato_merged_2016.csv")
write.csv(receita_total_por_candidato(receitas_candidatos_2016, all_munzona_candidatos_data, generos_2016),
          "receitas_por_candidatos_dadas_pelo_partido_merged_2016.csv")
