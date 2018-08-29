# Author:  Jair Neto, jair.neto@ccc.ufcg.edu.br
# Last change: 08/2018 
# ------------------------- Entrada -----------------------------
# Recebe como entrada os dados combinados dos tse de candidatos com gênero e o total de receitas utilizadas pelo candidato em 2016
# Recebe como entrada os dados combinados dos tse de candidatos com gênero e o total de receitas recebidas pelo candidato em 2016
# dadas pelo partido
# ------------------------- Saída -------------------------------
# Produz como saída um csv com todos os candidatos que não receberam verbas do partido

# ESSE SCRIPT TEM COMO OBJETIVO FILTRAR APENAS OS CANDIDATOS QUE RECEBERAM VERBAS DO PARTIDO.
#  PARA AQUELES QUE N RECEBERAM, INSERIMOS COMO 0.

library(tidyverse)

receitas_por_candidato_merged_2016 <- 
  read_csv("~/Área de Trabalho/hackfest-NNPSAO/nao-nasci-pra-ser-a-outra/data/investimentos_com_genero/receitas_por_candidato_merged_2016.csv") %>%
  select(-X1)

receitas_por_candidatos_dadas_pelo_partido_merged_2016 <- 
  read_csv("~/Área de Trabalho/hackfest-NNPSAO/nao-nasci-pra-ser-a-outra/data/investimentos_com_genero/receitas_por_candidatos_dadas_pelo_partido_merged_2016.csv") %>% 
  select(-c(X1_1, X1))

dt_all = data.table::data.table(receitas_por_candidato_merged_2016)
dt_part = data.table::data.table(receitas_por_candidatos_dadas_pelo_partido_merged_2016)

candidatos_sem_verba_de_partido = anti_join(dt_all, dt_part, by="nome_candidato")
candidatos_sem_verba_de_partido$verba_por_candidato = 0

receitas_candidatos_dada_pelo_partido = rbind(candidatos_sem_verba_de_partido, 
                                              as.data.frame(dt_part))
write.csv2(receitas_candidatos_dada_pelo_partido, "data/receitas_candidatos_dada_pelo_partido_2016")


