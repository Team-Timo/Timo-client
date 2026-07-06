import { Modal } from "@components/layout/modal/Modal";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Layout/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const TimoTimerIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="20"
      cy="20"
      r="18.3333"
      fill="#121212"
      stroke="#121212"
      strokeWidth="3.33333"
    />
    <rect
      x="30.7812"
      y="18.3335"
      width="2.96296"
      height="8.14815"
      transform="rotate(90 30.7812 18.3335)"
      fill="white"
    />
    <path
      d="M17.7604 22.3774L20.6657 22.9593L18.388 34.3325L15.4827 33.7507L17.7604 22.3774Z"
      fill="#4293F7"
    />
    <circle cx="19.9369" cy="19.9394" r="1.791" fill="#F2FC9F" />
    <path
      d="M20 1.85156V4.07378"
      stroke="white"
      strokeWidth="0.740741"
      strokeLinecap="round"
    />
    <path
      d="M20 35.9258V38.148"
      stroke="white"
      strokeWidth="0.740741"
      strokeLinecap="round"
    />
    <path
      d="M38.1459 20H35.9237"
      stroke="white"
      strokeWidth="0.740741"
      strokeLinecap="round"
    />
    <path
      d="M4.07288 20H1.85065"
      stroke="white"
      strokeWidth="0.740741"
      strokeLinecap="round"
    />
  </svg>
);

export const TimerEnd: Story = {
  name: "타이머 종료",
  render: () => (
    <Modal>
      <Modal.Trigger className="border-timo-gray-500 rounded-[4px] border px-3 py-2 text-sm">
        모달 열기
      </Modal.Trigger>
      <Modal.Overlay />
      <Modal.Panel>
        <Modal.Content>
          <Modal.Icon>
            <TimoTimerIcon />
          </Modal.Icon>
          <Modal.TextGroup>
            <Modal.Title>타이머 종료!</Modal.Title>
            <Modal.Description>다음 단계를 선택하세요.</Modal.Description>
          </Modal.TextGroup>
        </Modal.Content>
        <Modal.Footer>
          <Modal.BorderButton>계속하기</Modal.BorderButton>
          <Modal.FillButton>종료하기</Modal.FillButton>
        </Modal.Footer>
      </Modal.Panel>
    </Modal>
  ),
};

export const Withdrawal: Story = {
  name: "탈퇴",
  render: () => (
    <Modal>
      <Modal.Trigger className="border-timo-gray-500 rounded-[4px] border px-3 py-2 text-sm">
        모달 열기
      </Modal.Trigger>
      <Modal.Overlay />
      <Modal.Panel>
        <Modal.Content>
          <Modal.Icon>
            <TimoTimerIcon />
          </Modal.Icon>
          <Modal.TextGroup>
            <Modal.Title>
              정말 <span className="text-timo-red">탈퇴</span>하시겠어요?
            </Modal.Title>
            <Modal.Description>
              탈퇴 후에는 모든 데이터가 삭제되며 되돌릴 수 없어요.
            </Modal.Description>
          </Modal.TextGroup>
        </Modal.Content>
        <Modal.Footer>
          <Modal.BorderButton>탈퇴하기</Modal.BorderButton>
          <Modal.FillButton>취소하기</Modal.FillButton>
        </Modal.Footer>
      </Modal.Panel>
    </Modal>
  ),
};

export const Logout: Story = {
  name: "로그아웃",
  render: () => (
    <Modal>
      <Modal.Trigger className="border-timo-gray-500 rounded-[4px] border px-3 py-2 text-sm">
        모달 열기
      </Modal.Trigger>
      <Modal.Overlay />
      <Modal.Panel>
        <Modal.Content>
          <Modal.Icon>
            <TimoTimerIcon />
          </Modal.Icon>
          <Modal.TextGroup>
            <Modal.Title>로그아웃할까요?</Modal.Title>
            <Modal.Description>
              로그아웃 후에도 데이터는 그대로 유지돼요.
              <br />
              다시 로그인하면 이어서 사용할 수 있어요.
            </Modal.Description>
          </Modal.TextGroup>
        </Modal.Content>
        <Modal.Footer>
          <Modal.BorderButton>취소</Modal.BorderButton>
          <Modal.FillButton>로그아웃</Modal.FillButton>
        </Modal.Footer>
      </Modal.Panel>
    </Modal>
  ),
};

export const TimerSwitch: Story = {
  name: "새 작업 전환",
  render: () => (
    <Modal>
      <Modal.Trigger className="border-timo-gray-500 rounded-[4px] border px-3 py-2 text-sm">
        모달 열기
      </Modal.Trigger>
      <Modal.Overlay />
      <Modal.Panel>
        <Modal.Content>
          <Modal.Icon>
            <TimoTimerIcon />
          </Modal.Icon>
          <Modal.TextGroup>
            <Modal.Title>새 작업으로 전환할까요?</Modal.Title>
            <Modal.Description>
              새 작업을 시작하면 현재 타이머가 중단됩니다.
            </Modal.Description>
            <Modal.Description>새로운 작업을 시작하시겠어요?</Modal.Description>
          </Modal.TextGroup>
        </Modal.Content>
        <Modal.Footer>
          <Modal.BorderButton>계속 진행</Modal.BorderButton>
          <Modal.FillButton>전환하기</Modal.FillButton>
        </Modal.Footer>
      </Modal.Panel>
    </Modal>
  ),
};

export const TimerStop: Story = {
  name: "타이머 중단",
  render: () => (
    <Modal>
      <Modal.Trigger className="border-timo-gray-500 rounded-[4px] border px-3 py-2 text-sm">
        모달 열기
      </Modal.Trigger>
      <Modal.Overlay />
      <Modal.Panel>
        <Modal.Content>
          <Modal.Icon>
            <TimoTimerIcon />
          </Modal.Icon>
          <Modal.TextGroup>
            <Modal.Title>지금 멈출까요?</Modal.Title>
            <Modal.Description>
              지금까지 수행한{" "}
              <strong className="text-timo-blue-300 font-bold">12분</strong>이
              타임박스에 기록됩니다.
            </Modal.Description>
          </Modal.TextGroup>
        </Modal.Content>
        <Modal.Footer>
          <Modal.BorderButton>계속 진행</Modal.BorderButton>
          <Modal.FillButton>전환하기</Modal.FillButton>
        </Modal.Footer>
      </Modal.Panel>
    </Modal>
  ),
};

export const TagDelete: Story = {
  name: "일정 태그 삭제",
  render: () => (
    <Modal>
      <Modal.Trigger className="border-timo-gray-500 rounded-[4px] border px-3 py-2 text-sm">
        모달 열기
      </Modal.Trigger>
      <Modal.Overlay />
      <Modal.Panel>
        <Modal.Content>
          <Modal.Icon>
            <TimoTimerIcon />
          </Modal.Icon>
          <Modal.TextGroup>
            <Modal.Title>일정 태그를 삭제할까요?</Modal.Title>
            <Modal.Description>
              해당 태그가 적용된 모든 투두에서 태그가 삭제됩니다.
            </Modal.Description>
          </Modal.TextGroup>
        </Modal.Content>
        <Modal.Footer>
          <Modal.BorderButton>돌아가기</Modal.BorderButton>
          <Modal.FillButton>삭제하기</Modal.FillButton>
        </Modal.Footer>
      </Modal.Panel>
    </Modal>
  ),
};

export const CalendarDisconnect: Story = {
  name: "구글 캘린더 연동 해제",
  render: () => (
    <Modal>
      <Modal.Trigger className="border-timo-gray-500 rounded-[4px] border px-3 py-2 text-sm">
        모달 열기
      </Modal.Trigger>
      <Modal.Overlay />
      <Modal.Panel>
        <Modal.Content>
          <Modal.Icon>
            <TimoTimerIcon />
          </Modal.Icon>
          <Modal.TextGroup>
            <Modal.Title>구글 캘린더 연동을 해제할까요?</Modal.Title>
            <Modal.Description>
              연동을 해제하면 동기화된 일정이 사라져요.
              <br />
              정말 연동을 해제하시겠어요?
            </Modal.Description>
          </Modal.TextGroup>
        </Modal.Content>
        <Modal.Footer>
          <Modal.BorderButton>돌아가기</Modal.BorderButton>
          <Modal.FillButton>해제하기</Modal.FillButton>
        </Modal.Footer>
      </Modal.Panel>
    </Modal>
  ),
};

export const TodoDelete: Story = {
  name: "할 일 삭제",
  render: () => (
    <Modal>
      <Modal.Trigger className="border-timo-gray-500 rounded-[4px] border px-3 py-2 text-sm">
        모달 열기
      </Modal.Trigger>
      <Modal.Overlay />
      <Modal.Panel>
        <Modal.Content>
          <Modal.Icon>
            <TimoTimerIcon />
          </Modal.Icon>
          <Modal.TextGroup>
            <Modal.Title>이 할 일을 삭제할까요?</Modal.Title>
            <Modal.Description>
              삭제하면 작업과 관련된 정보가 함께 삭제됩니다.
            </Modal.Description>
          </Modal.TextGroup>
        </Modal.Content>
        <Modal.Footer>
          <Modal.BorderButton>돌아가기</Modal.BorderButton>
          <Modal.FillButton>삭제하기</Modal.FillButton>
        </Modal.Footer>
      </Modal.Panel>
    </Modal>
  ),
};
