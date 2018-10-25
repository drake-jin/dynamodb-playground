module.exports = [
  {
    TableName: 'CONTACT',
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },

    /*
    @@ AttributeType의 종류
      - S?: StringAttributeValue;
      - N?: NumberAttributeValue;
      - B?: BinaryAttributeValue;
      - SS?: StringSetAttributeValue;
      - NS?: NumberSetAttributeValue;
      - BS?: BinarySetAttributeValue;
      - M?: MapAttributeValue;
      - L?: ListAttributeValue;
      - NULL?: NullAttributeValue;
      - BOOL?: BooleanAttributeValue;
    */
    AttributeDefinitions: [
      {
        AttributeName: 'id',
        AttributeType: 'S',
      },
      {
        AttributeName: 'status',
        AttributeType: 'S',
      },
      {
        AttributeName: 'phone',
        AttributeType: 'S',
      },
      {
        AttributeName: 'name',
        AttributeType: 'S',
      },
      // 주의사항: AttributeDefinitions.length === KeySchema.length + GlobalSecondaryIndexes.length
    ],
    KeySchema: [ // 기본키에 대해서 지정합니다 . HASH 만, HASH+RANGE 조합만 사용가능합니다. 기본키는 2개를 넘을 수 없습니다.
      {
        AttributeName: 'id',
        KeyType: 'HASH', // 파티션 키(Partition Key)
      },
      {
        AttributeName: 'status',
        KeyType: 'RANGE', // 정렬 키(Sort Key)
      },
    ],
    GlobalSecondaryIndexes: [ // 최대 5개 까지가 한계임
      {
        IndexName: 'GSI_status', 
        // 검색을 위해서 만듬.
        // 쿼리를 돌리기 위해서는 최소 하나의 키가 필요하기 때문임
        // 이름,닉네임,지역 등등등 모든 조건을 넣을건데.... 전체행이 선택되어서 선택된 상태에서 조건문(ConditionStatements)을 돌리기 위함
        KeySchema: [
          {
            AttributeName: 'status',
            KeyType: 'HASH',
          },
        ],
        Projection: {
          ProjectionType: 'ALL'
        },
        /*
          Reference: https://docs.aws.amazon.com/ko_kr/amazondynamodb/latest/developerguide/GSI.html
          프로젝션(projection)이란 테이블에서 보조 인덱스로 복사되는 속성 집합을 말한다.
          테이블의 파티션 키와 정렬 키는 항상 인덱스로 프로젝션되지만,
          다른 속성을 프로젝션하여 애플리케이션의 쿼리 요건을 지원하는 것도 가능하다.
          따라서 인덱스에 쿼리를 실행할 때는 마치 속성이 자체 테이블에 저장되어 있는 것처럼
          DynamoDB가 프로젝션의 **모든 속성에 액세스**할 수 있습니다.
          Values = [KEYS_ONLY, INCLUDE, ALL]
        */
        ProvisionedThroughput: {
          ReadCapacityUnits: 3,
          WriteCapacityUnits: 3,
        }
        /*
          Reference: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-indexes-general.html#bp-indexes-general-projections
          한글문서보다 영문이 좀 더 설명을 이해하기에 정확해서 영문으로 준비했습니다. 물론 한글 문서를 봐도 무방합니다.
        */
      },
      {
        IndexName: 'GSI_phone', 
        KeySchema: [
          {
            AttributeName: 'phone',
            KeyType: 'HASH',
          },
        ],
        Projection: {
          ProjectionType: 'INCLUDE',
          NonKeyAttributes: [ // ProjectionType이 ALL이 아니면 NonKeyAttributes를 작성해주어야한다. (출력시 제외할 항목들)
            'id', 'status',
          ],  
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 3,
          WriteCapacityUnits: 3,
        }
      },
    ],
    /*
      Reference: https://docs.aws.amazon.com/ko_kr/amazondynamodb/latest/developerguide/LSI.html
      한 테이블당 최대 5개의 LSI(Local Secondary Index)를 만들어 낼 수 있다.

      모든 local secondary index는 다음 조건을 충족해야 한다.
      1. 파티션 키는 기본 테이블의 키와 동일하다.
      2. 정렬 키는 정확히 하나의 스칼라 속성으로 구성된다.
      3. 기본 테이블의 정렬 키가 인덱스로 프로젝션되며, 이 인덱스는 키가 아닌 속성으로 작동한다.

      local secondary index에서 정렬 키 값은 특정 파티션 키 값에 대해 고유하지 않아도 된다.
      동일한 정렬 키 값을 가진 local secondary index에 여러 항목이 있을 경우
      Query 작업에서 동일한 파티션 키 값을 가진 모든 항목이 반환된다.
      응답 시 일치하는 항목이 특정 순서로 반환되지 않습니다.

      최종적 일관된 읽기(Eventually Consistent Read) 또는
      강력한 일관된 읽기(Strongly Consistent Read)를 사용하여 local secondary index를 쿼리할 수 있다.
      원하는 유형의 일관성을 지정하려면 Query 작업의 ConsistentRead 파라미터를 사용합니다.
      local secondary index의 강력한 일관된 읽기(Strongly Consistent Read)는 언제나 최신 업데이트 값을 반환한다.
      쿼리가 기본 테이블에서 추가 속성을 가져와야 하는 경우 해당 속성은 인덱스와 일관성을 유지하게 된다.
    */
    LocalSecondaryIndexes: [
      // LSI는 테이블의 HASH + RANGE 키 조합으로 썻을 때 사용가능하며, 그 이유는 기본키에서 SORT키와 함께 사용도기 때문이다.
      // https://docs.aws.amazon.com/ko_kr/amazondynamodb/latest/developerguide/LSI.html
      // LSI의 KeySchema에서는 테이블의 HASH를 반드시 포함하여야 한다. 그리고 LSI의 RANGE키는 자신이 정렬하려고자 했던 키를 사용한다.
      {
        IndexName: 'LSI_name',
        KeySchema: [
          {
            AttributeName: 'id', 
            KeyType: 'HASH',
          },
          {
            AttributeName: 'name',
            KeyType: 'RANGE',
          },
        ],
        Projection: {
          ProjectionType: 'ALL',
        },
      }
    ],
  },

]