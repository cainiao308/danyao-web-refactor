import React, { useState, useRef, useEffect } from 'react';
import { Card, Typography, Input, Button, Space, Avatar, Divider } from '@arco-design/web-react';
import { IconSend, IconRobot, IconUser } from '@arco-design/web-react/icon';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content:
        '您好！我是军贸产品智能助手，可以为您解答关于弹药、火炮等军贸产品的问题。请问有什么可以帮助您的吗？',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 模拟AI回复
  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('红箭') || lowerMessage.includes('hj-12')) {
      return '红箭-12是中国研制的第三代反坦克导弹，采用激光制导，射程4-8公里，具有很强的破甲能力。它可以攻击各种装甲目标，包括坦克、装甲车等。';
    }

    if (lowerMessage.includes('地狱火') || lowerMessage.includes('hellfire')) {
      return 'AGM-114地狱火导弹是美国的空地导弹，主要用于攻击装甲目标。它有多种制导方式，包括激光制导和雷达制导，射程约8-11公里。';
    }

    if (lowerMessage.includes('155') || lowerMessage.includes('榴弹炮')) {
      return '155mm榴弹炮是目前北约标准口径，广泛使用的火炮系统。代表性产品包括M777、PLZ-05、PzH 2000等，射程通常在40-70公里之间。';
    }

    if (lowerMessage.includes('中国') || lowerMessage.includes('china')) {
      return '中国的主要军贸产品包括红箭系列反坦克导弹、PLZ-05自行榴弹炮、东风系列导弹等。主要制造商有中国兵器工业集团、中国航天科技集团等。';
    }

    if (lowerMessage.includes('美国') || lowerMessage.includes('usa')) {
      return '美国的军贸产品技术先进，包括地狱火导弹、M777榴弹炮、战斧巡航导弹等。主要制造商有洛克希德·马丁、雷神公司、通用动力等。';
    }

    if (lowerMessage.includes('对比') || lowerMessage.includes('比较')) {
      return '产品对比可以从多个维度进行：射程、精度、制导方式、成本、可靠性等。您可以使用我们的产品对比功能来详细比较不同产品的技术参数。';
    }

    return '感谢您的问题！我正在学习更多的军贸产品知识。您可以询问关于具体武器系统、技术参数、国家产品等方面的问题，我会尽力为您解答。';
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // 模拟AI思考时间
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        type: 'ai',
        content: getAIResponse(userMessage.content),
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const quickQuestions = [
    '红箭-12导弹的技术参数是什么？',
    '155mm榴弹炮有哪些代表性产品？',
    '中美军贸产品有什么区别？',
    '如何选择合适的反坦克导弹？',
  ];

  return (
    <div style={{ padding: '20px', background: '#f5f7fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Card>
          <Title heading={4} style={{ marginBottom: '20px', textAlign: 'center' }}>
            AI 智能问答
          </Title>

          {/* 消息列表 */}
          <div
            style={{
              height: '500px',
              overflowY: 'auto',
              padding: '20px',
              background: '#fafbfc',
              borderRadius: '8px',
              marginBottom: '20px',
            }}
          >
            {messages.map(message => (
              <div key={message.id} style={{ marginBottom: '20px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: message.type === 'user' ? 'row-reverse' : 'row',
                  }}
                >
                  <Avatar
                    style={{
                      flexShrink: 0,
                      margin: message.type === 'user' ? '0 0 0 12px' : '0 12px 0 0',
                    }}
                  >
                    {message.type === 'user' ? <IconUser /> : <IconRobot />}
                  </Avatar>
                  <div
                    style={{
                      maxWidth: '70%',
                      textAlign: message.type === 'user' ? 'right' : 'left',
                    }}
                  >
                    <div
                      style={{
                        background: message.type === 'user' ? '#165dff' : 'white',
                        color: message.type === 'user' ? 'white' : '#1d2129',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      }}
                    >
                      {message.content}
                    </div>
                    <Text
                      type="secondary"
                      style={{
                        fontSize: '12px',
                        marginTop: '4px',
                        display: 'block',
                      }}
                    >
                      {formatTime(message.timestamp)}
                    </Text>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Avatar style={{ flexShrink: 0, marginRight: '12px' }}>
                    <IconRobot />
                  </Avatar>
                  <div
                    style={{
                      background: 'white',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  >
                    <Text type="secondary">AI正在思考中...</Text>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 快速问题 */}
          {messages.length <= 1 && (
            <div style={{ marginBottom: '20px' }}>
              <Text type="secondary" style={{ marginBottom: '12px', display: 'block' }}>
                试试这些问题：
              </Text>
              <Space wrap>
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    type="outline"
                    size="small"
                    onClick={() => setInputValue(question)}
                  >
                    {question}
                  </Button>
                ))}
              </Space>
              <Divider />
            </div>
          )}

          {/* 输入区域 */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <TextArea
              value={inputValue}
              onChange={setInputValue}
              onKeyPress={handleKeyPress}
              placeholder="请输入您的问题..."
              autoSize={{ minRows: 1, maxRows: 4 }}
              style={{ flex: 1 }}
              disabled={isLoading}
            />
            <Button
              type="primary"
              icon={<IconSend />}
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              loading={isLoading}
            >
              发送
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default AIChat;
