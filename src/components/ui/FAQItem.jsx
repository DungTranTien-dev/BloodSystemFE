import React from 'react';
import { Card, Typography, Tag, Collapse } from 'antd';

const { Panel } = Collapse;
const { Text } = Typography;

const FAQItem = ({ 
  question, 
  answer, 
  tags = [], 
  defaultActive = false,
  className = '' 
}) => {
  return (
    <Card className={`shadow-sm hover:shadow-md transition-shadow ${className}`}>
      <Collapse 
        ghost 
        defaultActiveKey={defaultActive ? ['1'] : []}
        className="!border-none"
      >
        <Panel
          header={
            <div className="font-medium text-gray-800 text-base">
              {question}
            </div>
          }
          key="1"
          className="!border-none"
        >
          <div className="pt-2">
            <Text className="text-gray-700 leading-relaxed block mb-3">
              {answer}
            </Text>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {tags.map((tag, index) => (
                  <Tag key={index} color="red" className="text-xs">
                    {tag}
                  </Tag>
                ))}
              </div>
            )}
          </div>
        </Panel>
      </Collapse>
    </Card>
  );
};

export default FAQItem;
