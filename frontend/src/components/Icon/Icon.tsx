import {
  ArrowUpDown, BaggageClaim, BookOpen, BriefcaseBusiness, CarFront,
  ChevronDown, ChevronLeft, ChevronRight, ChevronUp,
  CircleArrowDown, CircleArrowUp, Dumbbell, Eye, EyeOff,
  Gift, HeartPulse, House, Lock, LogIn, LogOut, Mail, Mailbox,
  PawPrint, PiggyBank, Plus, ReceiptText, Search, ShoppingCart,
  SquarePen, Tag, Ticket, ToolCase, Trash2, UserRound, UserRoundPlus,
  Utensils, Wallet, X, type LucideProps,
} from 'lucide-react';

const icons = {
  'arrow-up-down': ArrowUpDown,
  'baggage-claim': BaggageClaim,
  'book-open': BookOpen,
  'briefcase-business': BriefcaseBusiness,
  'car-front': CarFront,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-up': ChevronUp,
  'circle-arrow-down': CircleArrowDown,
  'circle-arrow-up': CircleArrowUp,
  'dumbbell': Dumbbell,
  'eye': Eye,
  'eye-closed': EyeOff,
  'gift': Gift,
  'heart-pulse': HeartPulse,
  'house': House,
  'lock': Lock,
  'log-in': LogIn,
  'log-out': LogOut,
  'mail': Mail,
  'mailbox': Mailbox,
  'paw-print': PawPrint,
  'piggy-bank': PiggyBank,
  'plus': Plus,
  'receipt-text': ReceiptText,
  'search': Search,
  'shopping-cart': ShoppingCart,
  'square-pen': SquarePen,
  'tag': Tag,
  'ticket': Ticket,
  'tool-case': ToolCase,
  'trash': Trash2,
  'user-round': UserRound,
  'user-round-plus': UserRoundPlus,
  'utensils': Utensils,
  'wallet': Wallet,
  'x': X,
} as const;

export type IconName = keyof typeof icons;

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 18, ...props }: IconProps) {
  const LucideIcon = icons[name] ?? Tag;
  return <LucideIcon size={size} {...props} />;
}
