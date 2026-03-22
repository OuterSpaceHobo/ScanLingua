import React from 'react'

export function ZoneContainer({ children }: { children: React.ReactNode }) {
  return <div className="grid w-full bg-transparent grid-cols-[auto_auto_auto]">{children}</div>
}

export function ContentBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[365px] text-left min-h-fit max-h-[250px] col-start-1 bg-white z-[inherit] shadow-card text-black overflow-x-scroll overflow-y-auto [&::-webkit-scrollbar]:hidden">
      {children}
    </div>
  )
}

export function BlankColumn() {
  return <div className="w-[5px] opacity-0 col-start-2" />
}

export function ButtonColumn({ children }: { children: React.ReactNode }) {
  return <div className="w-[35px] h-[75px] rounded-[5px] col-start-3 z-[calc(9e999)] text-black">{children}</div>
}

export function ContentP({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <p className="font-sans text-[20px] font-light text-black no-underline !m-[5px] antialiased animate-fade-in" style={style}>
      {children}
    </p>
  )
}

export function ContentSpan({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-sans text-[20px] font-light text-black no-underline antialiased animate-fade-in">
      {children}
    </span>
  )
}

export function InputP({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[20px] font-normal text-black no-underline !m-[5px] !mb-0 antialiased">
      {children}
    </p>
  )
}

export function SaveCloseDiv({ children, input, ref }: { children: React.ReactNode; input: boolean; ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={`grid [grid-area:'1_/_1'] ${input ? 'visible max-h-fit' : 'invisible max-h-0'}`}>
      {children}
    </div>
  )
}

export function EditDiv({ children, input, ref }: { children: React.ReactNode; input: boolean; ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={`grid [grid-area:'1_/_1'] ${!input ? 'visible max-h-fit' : 'invisible max-h-0'}`}>
      {children}
    </div>
  )
}

export function EditSpan({ children, input }: { children: React.ReactNode; input: boolean }) {
  return (
    <span className={`inline-block transition-opacity duration-300 ease-in-out ${!input ? 'opacity-100' : 'opacity-0'}`}>
      {children}
    </span>
  )
}

export function SaveCloseSpan({ children, input }: { children: React.ReactNode; input: boolean }) {
  return (
    <span className={`text-end transition-opacity duration-300 ease-in-out ${input ? 'opacity-100' : 'opacity-0'}`}>
      {children}
    </span>
  )
}

export function EditTextarea({ defaultValue, onChange, autoFocus, ref }: {
  defaultValue: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  autoFocus?: boolean;
  ref?: React.Ref<HTMLTextAreaElement>;
}) {
  return (
    <textarea
      ref={ref}
      autoFocus={autoFocus}
      defaultValue={defaultValue}
      onChange={onChange}
      className="outline-none border-none w-full p-0 font-sans text-[20px] font-normal text-black leading-normal no-underline"
    />
  )
}

export function KanjiForm({ children, action }: { children: React.ReactNode; action?: string }) {
  return (
    <form action={action} className="font-sans text-[20px] font-normal text-black leading-normal no-underline antialiased
      !mx-[5px] !mt-[5px] !mb-0">
      {children} 
    </form>
  )
} 

export function InfoP({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[15px] font-light text-black leading-normal no-underline !m-[5px] !mb-0 antialiased w-fit bg-surface border border-border rounded-[5px] 
      !pl-[2px] !pr-[2px]">
      {children}
    </p>
  )
}

export function KanjiSpan({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-sans text-[30px] font-normal leading-normal no-underline antialiased text-center [margin-block:0]">
      {children}
    </span>
  )
}

export function KanjiStatP({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[14px] font-light text-black leading-normal no-underline antialiased text-center">
      {children}
    </p>
  )
}

export function KanjiTd({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <td className="border-none outline-none text-center" style={style}>
      {children}
    </td>
  )
}

export function KanjiCardDiv({ children }: { children: React.ReactNode }) {
  return <div className="grid justify-end">{children}</div>
}

export function KanjiTab({ children }: { children: React.ReactNode }) {
  return (
    <table className="border-none outline-none w-full pr-[5px] antialiased">
      {children}
    </table>
  )
}

export function BottomDiv({ children }: { children: React.ReactNode }) {
  return <div className="border-b border-border">{children}</div>
}

export function KanjiStatDiv({ children, dropdown, index, className, ref }: {
  children: React.ReactNode;
  dropdown: number | null;
  index: number;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={ref}
      className={`${dropdown === index ? 'block' : 'hidden'} border-t border-border absolute z-[1000000] bg-surface w-full ${className || ''}`}>
      {children}
    </div>
  )
}

export function NotificationDiv({ children, notification, fade, err }: {
  children: React.ReactNode;
  notification: { message: string; id: number } | null;
  fade: boolean;
  err: boolean;
}) {
  return (
    <div className={`rounded-[5px] !m-[5px] text-center absolute w-[355px] z-[9999999] transition-[visibility,opacity] duration-300 ease-in-out ${err ? 'bg-error' : 'bg-primary'} ${notification ? 'visible' : 'invisible'} ${fade ? 'opacity-100' : 'opacity-0'} ${notification ? 'max-h-full' : 'max-h-0'}`}>
      {children}
    </div>
  )
}
