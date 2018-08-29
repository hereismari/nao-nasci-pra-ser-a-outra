# Instruções

Os scripts estão organizados da seguinte forma:
 
 * `/candidatos`: correspondente aos scripts de preprocessamentos dos dados dos candidatos;
     * `preprocess_candidatos.R`: Reúne em um dataframe com todos os arquivos dos candidatos de um ano (ou vários anos) com as colunas já selecionadas;
     * `preprocess_candidatos_auxiliares.R`: Une os dataframes gerados nos scripts `preprocess_candidatos.R` e `preprocess_resultados.R`, retornando um dataframe contendo os resultados das eleições com o sexo dos candidatos (por ano ou total); 
     * `filter_candidatos_desistentes.R`: **TODO** Documentação e refatoramento
     * `processa_receitas.R`: **TODO** Documentação e refatoramento
 * `/eleitores`: correspondente aos scripts de preprocessamentos dos dados dos eleitores;
     * `processa_eleitores.R`: Retorna um dataframe contendo informações dos eleitores;
 * `/historico`: correspondente aos scripts que retornam o histórico de mulheres e homens fantasmas;
     * `reduce_candidates_data_and_bind.R`: 
 * `/partidos`: correspondente aos scripts que retornam a proporção de mulheres, número de candidatas fantasmas por partido, UF e ano de eleição;
     * ``
 * `/resultados`: correspondente aos scripts de preprocessamentos dos resultados das eleições;
     * ``
 * `/utils`: correspondente aos demais scripts utilizados;
 